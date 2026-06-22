import { Request, Response, NextFunction } from 'express';
import { CategoriesService } from './categories.service';
import { ResponseUtil } from '../../shared/utils/response.util';

export class CategoriesController {
  static async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await CategoriesService.getAllCategories();
      ResponseUtil.success(res, categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const category = await CategoriesService.getCategoryById(id);
      ResponseUtil.success(res, category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await CategoriesService.createCategory(req.body);
      ResponseUtil.created(res, category, 'Category created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const category = await CategoriesService.updateCategory(id, req.body);
      ResponseUtil.success(res, category, 'Category updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const result = await CategoriesService.deleteCategory(id);
      console.log(result,"delete category")
      ResponseUtil.success(res, result, 'Category deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
