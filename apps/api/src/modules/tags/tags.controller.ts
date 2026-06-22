import { Request, Response, NextFunction } from 'express';
import { TagsService } from './tags.service';
import { ResponseUtil } from '../../shared/utils/response.util';

export class TagsController {
  static async getAllTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await TagsService.getAllTags();
      ResponseUtil.success(res, tags);
    } catch (error) {
      next(error);
    }
  }

  static async getTagById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const tag = await TagsService.getTagById(id);
      ResponseUtil.success(res, tag);
    } catch (error) {
      next(error);
    }
  }

  static async createTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await TagsService.createTag(req.body);
      ResponseUtil.created(res, tag, 'Tag created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const tag = await TagsService.updateTag(id, req.body);
      ResponseUtil.success(res, tag, 'Tag updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const result = await TagsService.deleteTag(id);
      ResponseUtil.success(res, result, 'Tag deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
