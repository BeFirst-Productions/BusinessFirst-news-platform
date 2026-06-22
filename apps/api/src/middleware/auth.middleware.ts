import { Request, Response, NextFunction } from 'express';
import { JwtUtil, TokenPayload } from '../shared/utils/jwt.util';
import { prisma } from '../config/database';
import { UnauthorizedError, ForbiddenError } from '../shared/errors/AppError';
import { UserStatus } from '../generated/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload & {
        status?: UserStatus;
        canCreateUsers?: boolean;
      };
    }
  }
}

export class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
      }

      const token = authHeader.split(' ')[1];
      
      if (!token || token === 'null' || token === 'undefined') {
        throw new UnauthorizedError('Invalid token format');
      }

      const decoded = JwtUtil.verifyAccessToken(token);

      // Verify user exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          canCreateUsers: true,
        },
      });

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedError('Account is not active. Contact administrator.');
      }

      // Attach user to request
      req.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        canCreateUsers: user.canCreateUsers,
      };

      next();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        next(error);
      } else {
        next(new UnauthorizedError('Invalid or expired token'));
      }
    }
  }

  static authorize(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user) {
        throw new UnauthorizedError('Not authenticated');
      }

      if (roles.length > 0 && !roles.includes(req.user.role)) {
        throw new ForbiddenError('Insufficient permissions');
      }

      next();
    };
  }

  static async optionalAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        
        if (token && token !== 'null' && token !== 'undefined') {
          try {
            const decoded = JwtUtil.verifyAccessToken(token);
            
            const user = await prisma.user.findUnique({
              where: { id: decoded.userId },
              select: {
                id: true,
                email: true,
                role: true,
                status: true,
                canCreateUsers: true,
              },
            });

            if (user && user.status === UserStatus.ACTIVE) {
              req.user = {
                userId: user.id,
                email: user.email,
                role: user.role,
                status: user.status,
                canCreateUsers: user.canCreateUsers,
              };
            }
          } catch {
            // Token invalid, continue without user
          }
        }
      }

      next();
    } catch (error) {
      next();
    }
  }
}