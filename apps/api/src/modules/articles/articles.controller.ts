import { Request, Response, NextFunction } from 'express';
import { ArticlesService } from './articles.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { ArticleQueryInput } from './articles.validation';

export class ArticlesController {
  static async getArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as ArticleQueryInput;
      const { articles, total } = await ArticlesService.getArticles(query);
      ResponseUtil.paginated(res, articles, total, query.page, query.limit);
    } catch (error) {
      next(error);
    }
  }

  static async getArticleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const article = await ArticlesService.getArticleById(id);
      ResponseUtil.success(res, article);
    } catch (error) {
      next(error);
    }
  }

  static async createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res);
        return;
      }
      const article = await ArticlesService.createArticle(req.body, req.user.userId);
      ResponseUtil.created(res, article, 'Article created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const article = await ArticlesService.updateArticle(id, req.body);
      ResponseUtil.success(res, article, 'Article updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const result = await ArticlesService.deleteArticle(id);
      ResponseUtil.success(res, result, 'Article deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async bulkDeleteArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { ids } = req.body;
      const result = await ArticlesService.bulkDeleteArticles(ids);
      ResponseUtil.success(res, result, 'Articles deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
