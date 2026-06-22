import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { UserQueryInput } from './users.validation';

export class UsersController {
  static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as UserQueryInput;
      const { users, total } = await UsersService.getUsers(query);
      ResponseUtil.paginated(res, users, total, query.page, query.limit);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const user = await UsersService.getUserById(id);
      ResponseUtil.success(res, user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res);
        return;
      }
      const user = await UsersService.createUser(req.body, req.user.userId);
      ResponseUtil.created(res, user, 'User created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const user = await UsersService.updateUser(id, req.body);
      ResponseUtil.success(res, user, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res);
        return;
      }
      const id = req.params.id as string;
      const result = await UsersService.deleteUser(id, req.user.userId);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const result = await UsersService.updateUserPermissions(id, req.body);
      ResponseUtil.success(res, result, 'Permissions updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getUserPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const permissions = await UsersService.getUserPermissions(id);
      ResponseUtil.success(res, permissions);
    } catch (error) {
      next(error);
    }
  }
}