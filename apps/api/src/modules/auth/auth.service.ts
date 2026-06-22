import { prisma } from '../../config/database';
import { PasswordUtil } from '../../shared/utils/password.util';
import { JwtUtil, TokenPayload } from '../../shared/utils/jwt.util';
import { 
  UnauthorizedError, 
  BadRequestError, 
  NotFoundError,
  ConflictError 
} from '../../shared/errors/AppError';
import RedisClient from '../../config/redis';
import { UserStatus, Role } from '../../generated/prisma';
import { UsersService } from '../users/users.service';

export class AuthService {
  static async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check account status
    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedError('Account is deactivated. Contact administrator.');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedError('Account is suspended. Contact administrator.');
    }

    // Verify password
    const isPasswordValid = await PasswordUtil.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = JwtUtil.generateAccessToken(tokenPayload);
    const refreshToken = JwtUtil.generateRefreshToken(tokenPayload);

    // Store refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
        lastLoginAt: new Date(),
      },
    });

    // Cache user permissions
    await AuthService.cacheUserPermissions(user.id);

    // Retrieve permissions
    const userModules = await prisma.userModulePermission.findMany({
      where: { userId: user.id },
      include: {
        module: {
          select: { code: true }
        }
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        bio: user.bio,
        canCreateUsers: user.canCreateUsers,
        modules: userModules,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  static async register(data: {
    email: string;
    password: string;
    name: string;
    role?: Role;
    createdBy?: string;
  }) {
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
        role: data.role || 'EDITOR',
        createdBy: data.createdBy,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
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

  static async refreshToken(token: string) {
    try {
      const decoded = JwtUtil.verifyRefreshToken(token);

      // Verify user exists and token matches
      const user = await prisma.user.findFirst({
        where: {
          id: decoded.userId,
          refreshToken: token,
          status: UserStatus.ACTIVE,
        },
      });

      if (!user) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      // Generate new tokens
      const tokenPayload: TokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = JwtUtil.generateAccessToken(tokenPayload);
      const refreshToken = JwtUtil.generateRefreshToken(tokenPayload);

      // Update refresh token
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  static async logout(userId: string) {
    // Clear refresh token
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    // Clear cached permissions
    await RedisClient.del(`permissions:${userId}:*`);
    await RedisClient.delByPattern(`permissions:${userId}:*`);

    return { message: 'Logged out successfully' };
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Verify current password
    const isPasswordValid = await PasswordUtil.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError('Current password is incorrect');
    }

    // Validate new password
    const passwordCheck = PasswordUtil.validateStrength(newPassword);
    if (!passwordCheck.isValid) {
      throw new BadRequestError(passwordCheck.errors.join('. '));
    }

    // Update password
    const hashedPassword = await PasswordUtil.hash(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }

  private static async cacheUserPermissions(userId: string): Promise<void> {
    const permissions = await prisma.userModulePermission.findMany({
      where: { userId },
      include: {
        module: {
          select: {
            code: true,
          },
        },
      },
    });

    for (const permission of permissions) {
      const cacheKey = `permissions:${userId}:${permission.module.code}`;
      const permissionData = {
        view: permission.canView,
        create: permission.canCreate,
        edit: permission.canEdit,
        delete: permission.canDelete,
      };

      await RedisClient.set(cacheKey, JSON.stringify(permissionData), 3600);
    }
  }
}