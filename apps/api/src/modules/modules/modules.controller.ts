import { Request, Response, NextFunction } from 'express';
import { ModulesService } from './modules.service';
import { ResponseUtil } from '../../shared/utils/response.util';

export class ModulesController {
  static async getAllModules(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const modules = await ModulesService.getAllModules();
      ResponseUtil.success(res, modules);
    } catch (error) {
      next(error);
    }
  }

  static async getModuleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const module = await ModulesService.getModuleById(id);
      ResponseUtil.success(res, module);
    } catch (error) {
      next(error);
    }
  }

  static async createModule(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const module = await ModulesService.createModule(req.body);
      ResponseUtil.created(res, module, 'Module created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateModule(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const module = await ModulesService.updateModule(id, req.body);
      ResponseUtil.success(res, module, 'Module updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteModule(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const result = await ModulesService.deleteModule(id);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}