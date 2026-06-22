import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { ForbiddenError } from '../shared/errors/AppError';
import RedisClient from '../config/redis';

type PermissionAction = 'view' | 'create' | 'edit' | 'delete';

export class PermissionMiddleware {
  static checkModule(moduleCode: string, action: PermissionAction) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        if (!req.user) {
          throw new ForbiddenError('Not authenticated');
        }

        // SUPERADMIN has all permissions by default and bypasses checks
        if (req.user.role === 'SUPERADMIN') {
          return next();
        }

        // Check cache first
        const cacheKey = `permissions:${req.user.userId}:${moduleCode}`;
        const cached = await RedisClient.get(cacheKey);
        
        let hasPermission = false;

        if (cached) {
          const permissions = JSON.parse(cached);
          hasPermission = permissions[action] === true;
        } else {
          // Query database for permissions
          const module = await prisma.module.findUnique({
            where: { code: moduleCode },
            select: { id: true },
          });

          if (!module) {
            throw new ForbiddenError('Module not found');
          }

          const userPermission = await prisma.userModulePermission.findUnique({
            where: {
              userId_moduleId: {
                userId: req.user.userId,
                moduleId: module.id,
              },
            },
          });

          if (userPermission) {
            // Cache permissions
            await RedisClient.set(
              cacheKey,
              JSON.stringify({
                view: userPermission.canView,
                create: userPermission.canCreate,
                edit: userPermission.canEdit,
                delete: userPermission.canDelete,
              }),
              3600 // 1 hour
            );

            hasPermission = userPermission[`can${action.charAt(0).toUpperCase() + action.slice(1)}` as keyof typeof userPermission] as boolean;
          }
        }

        if (!hasPermission) {
          throw new ForbiddenError(
            `You don't have ${action} permission for ${moduleCode} module`
          );
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static canCreateUsers(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      throw new ForbiddenError('Not authenticated');
    }

    // SUPERADMIN can always create users
    if (req.user.role === 'SUPERADMIN') {
      return next();
    }

    // Check if user has canCreateUsers flag
    if (req.user.canCreateUsers) {
      return next();
    }

    throw new ForbiddenError('You do not have permission to create users');
  }
}