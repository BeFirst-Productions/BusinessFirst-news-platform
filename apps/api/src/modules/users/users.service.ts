import { prisma } from '../../config/database';
import { PasswordUtil } from '../../shared/utils/password.util';
import { 
  NotFoundError, 
  ConflictError, 
  BadRequestError,
  ForbiddenError 
} from '../../shared/errors/AppError';
import RedisClient from '../../config/redis';
import { Prisma, UserStatus, Role } from '../../generated/prisma';
import { CreateUserInput, UpdateUserInput, UpdateUserPermissionsInput, UserQueryInput } from './users.validation';

export class UsersService {
  static async getUsers(query: UserQueryInput) {
    const {
      page,
      limit,
      role,
      status,
      search,
      sortBy,
      sortOrder,
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.UserWhereInput = {};

    if (role && role !== 'SUPERADMIN') {
      where.role = role as Role;
    } else {
      where.role = {
        not: 'SUPERADMIN',
      };
    }

    if (status) {
      where.status = status as UserStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build order by
    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          avatar: true,
          bio: true,
          canCreateUsers: true,
          lastLoginAt: true,
          createdBy: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              articles: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        bio: true,
        canCreateUsers: true,
        createdBy: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            articles: true,
            createdUsers: true,
          },
        },
        modules: {
          include: {
            module: {
              select: {
                id: true,
                name: true,
                code: true,
                description: true,
              },
            },
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  static getRoleDefaultPermissions(role: Role, moduleCode: string) {
    if (role === 'ADMIN') {
      if (moduleCode === 'DASHBOARD' || moduleCode === 'ANALYTICS') {
        return { canView: true, canCreate: false, canEdit: false, canDelete: false };
      }
      return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    }

    if (role === 'EDITOR') {
      switch (moduleCode) {
        case 'DASHBOARD':
          return { canView: true, canCreate: false, canEdit: false, canDelete: false };
        case 'ARTICLES':
          return { canView: true, canCreate: true, canEdit: true, canDelete: false };
        case 'CATEGORIES':
          return { canView: true, canCreate: false, canEdit: false, canDelete: false };
        case 'TAGS':
          return { canView: true, canCreate: true, canEdit: true, canDelete: false };
        case 'MEDIA':
          return { canView: true, canCreate: true, canEdit: true, canDelete: false };
        case 'COMMENTS':
          return { canView: true, canCreate: false, canEdit: true, canDelete: false };
        default:
          return { canView: false, canCreate: false, canEdit: false, canDelete: false };
      }
    }

    return { canView: false, canCreate: false, canEdit: false, canDelete: false };
  }

  static async createUser(data: CreateUserInput, createdBy: string) {
    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Validate password strength
    const passwordCheck = PasswordUtil.validateStrength(data.password);
    if (!passwordCheck.isValid) {
      throw new BadRequestError(passwordCheck.errors.join('. '));
    }

    // Hash password
    const hashedPassword = await PasswordUtil.hash(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role as Role,
        canCreateUsers: data.canCreateUsers,
        avatar: data.avatar,
        bio: data.bio,
        createdBy,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        canCreateUsers: true,
        avatar: true,
        createdAt: true,
      },
    });

    // Fetch all active modules from the database
    const modules = await prisma.module.findMany({
      where: { isActive: true },
    });

    // Populate user permissions using role defaults
    if (modules.length > 0) {
      await prisma.userModulePermission.createMany({
        data: modules.map((m) => {
          const defaults = UsersService.getRoleDefaultPermissions(user.role as Role, m.code);
          return {
            userId: user.id,
            moduleId: m.id,
            ...defaults,
          };
        }),
      });
    }

    // Cache the permissions in Redis
    const userPermissions = await prisma.userModulePermission.findMany({
      where: { userId: user.id },
      include: {
        module: {
          select: { code: true },
        },
      },
    });

    for (const permission of userPermissions) {
      const cacheKey = `permissions:${user.id}:${permission.module.code}`;
      await RedisClient.set(
        cacheKey,
        JSON.stringify({
          view: permission.canView,
          create: permission.canCreate,
          edit: permission.canEdit,
          delete: permission.canDelete,
        }),
        3600
      );
    }

    return user;
  }

  static async updateUser(userId: string, data: UpdateUserInput) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Prevent modification of SUPERADMIN role
    if (user.role === 'SUPERADMIN' && data.role) {
      throw new ForbiddenError('Cannot change SUPERADMIN role');
    }

    // Check email uniqueness if changing
    if (data.email && data.email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictError('Email already in use');
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        bio: true,
        canCreateUsers: true,
        updatedAt: true,
      },
    });

    // Clear cached permissions if role changed
    if (data.role) {
      await RedisClient.delByPattern(`permissions:${userId}:*`);
    }

    return updatedUser;
  }

  static async deleteUser(userId: string, currentUserId: string) {
    if (userId === currentUserId) {
      throw new BadRequestError('Cannot delete your own account');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.role === 'SUPERADMIN') {
      throw new ForbiddenError('Cannot delete SUPERADMIN');
    }

    // Hard delete - permanently remove user
    await prisma.user.delete({
      where: { id: userId },
    });

    // Remove related permissions
    await prisma.userModulePermission.deleteMany({ where: { userId } });

    // Clear permissions cache
    await RedisClient.delByPattern(`permissions:${userId}:*`);

    return { message: 'User deleted successfully' };
  }

  static async updateUserPermissions(
    userId: string,
    data: UpdateUserPermissionsInput
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.role === 'SUPERADMIN') {
      throw new ForbiddenError('Cannot modify SUPERADMIN permissions');
    }

    // Use transaction to update permissions atomically
    await prisma.$transaction(async (tx) => {
      // Delete existing permissions
      await tx.userModulePermission.deleteMany({
        where: { userId },
      });

      // Create new permissions
      if (data.permissions.length > 0) {
        await tx.userModulePermission.createMany({
          data: data.permissions.map(permission => ({
            userId,
            moduleId: permission.moduleId,
            canView: permission.canView,
            canCreate: permission.canCreate,
            canEdit: permission.canEdit,
            canDelete: permission.canDelete,
          })),
        });
      }
    });

    // Clear permissions cache
    await RedisClient.delByPattern(`permissions:${userId}:*`);

    // Recache permissions
    const updatedPermissions = await prisma.userModulePermission.findMany({
      where: { userId },
      include: {
        module: {
          select: { code: true },
        },
      },
    });

    for (const permission of updatedPermissions) {
      const cacheKey = `permissions:${userId}:${permission.module.code}`;
      await RedisClient.set(
        cacheKey,
        JSON.stringify({
          view: permission.canView,
          create: permission.canCreate,
          edit: permission.canEdit,
          delete: permission.canDelete,
        }),
        3600
      );
    }

    return { message: 'Permissions updated successfully', permissions: updatedPermissions };
  }

  static async getUserPermissions(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const permissions = await prisma.userModulePermission.findMany({
      where: { userId },
      include: {
        module: {
          select: {
            id: true,
            name: true,
            code: true,
            description: true,
            icon: true,
          },
        },
      },
    });

    return permissions;
  }
}