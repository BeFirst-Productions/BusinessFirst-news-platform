import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { AppError } from '../../shared/errors/AppError';
import { prisma } from '../../config/database';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);

      // Log successful login activity
      await prisma.articleActivity.create({
        data: {
          action: 'LOGIN',
          details: { email },
          userId: result.user.id,
          articleId: undefined,
        },
      });

      ResponseUtil.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = {
        ...req.body,
        createdBy: req.user?.userId,
      };
      const user = await AuthService.register(userData);
      ResponseUtil.created(res, user, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const tokens = await AuthService.refreshToken(refreshToken);
      ResponseUtil.success(res, tokens, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Not authenticated', 401);
      }
      const result = await AuthService.logout(req.user.userId);
      ResponseUtil.success(res, result, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Not authenticated', 401);
      }
      const { currentPassword, newPassword } = req.body;
      const result = await AuthService.changePassword(
        req.user.userId,
        currentPassword,
        newPassword
      );
      ResponseUtil.success(res, result, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Not authenticated', 401);
      }
      
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          avatar: true,
          bio: true,
          canCreateUsers: true,
          modules: {
            include: {
              module: {
                select: { code: true }
              }
            }
          }
        }
      });

      ResponseUtil.success(res, user, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Not authenticated', 401);
      }

      const { name, avatar, bio } = req.body;
      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (avatar !== undefined) updateData.avatar = avatar || null;
      if (bio !== undefined) updateData.bio = bio || null;

      const user = await prisma.user.update({
        where: { id: req.user.userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          avatar: true,
          bio: true,
          canCreateUsers: true,
          modules: {
            include: {
              module: {
                select: { code: true }
              }
            }
          }
        }
      });

      ResponseUtil.success(res, user, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }
}