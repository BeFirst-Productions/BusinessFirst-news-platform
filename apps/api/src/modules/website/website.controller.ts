import { Request, Response, NextFunction } from 'express';
import { WebsiteService } from './website.service';

export class WebsiteController {
  static async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const search = req.query.search as string;
      const categoryId = req.query.categoryId as string;
      const sortBy = req.query.sortBy as string;
      const sortOrder = req.query.sortOrder as 'asc' | 'desc';

      let isFeatured: boolean | undefined = undefined;
      if (req.query.isFeatured !== undefined) {
        isFeatured = req.query.isFeatured === 'true';
      }

      let isBreakingNews: boolean | undefined = undefined;
      if (req.query.isBreakingNews !== undefined) {
        isBreakingNews = req.query.isBreakingNews === 'true';
      }

      const result = await WebsiteService.getArticles({
        page,
        limit,
        search,
        categoryId,
        isFeatured,
        isBreakingNews,
        sortBy,
        sortOrder,
      });

      res.status(200).json({
        success: true,
        message: 'Articles retrieved successfully',
        data: {
          data: result.data,
          metadata: result.metadata,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getArticleBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const article = await WebsiteService.getArticleBySlug(slug);

      res.status(200).json({
        success: true,
        message: 'Article retrieved successfully',
        data: article,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRelatedArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const limit = Number(req.query.limit) || 4;
      const result = await WebsiteService.getRelatedArticles(id, limit);

      res.status(200).json({
        success: true,
        message: 'Related articles retrieved successfully',
        data: {
          data: result.data,
          metadata: result.metadata,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async incrementArticleView(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await WebsiteService.trackAdImpression(id, 'article-view'); // Reusing helper or just custom increment. Wait, let's call the proper increment if needed.
      // Wait, let's call WebsiteService.getArticleBySlug's increment logic or a direct prisma call if needed.
      // In website.service.ts, we already have increment view in getArticleBySlug. But if frontend calls POST /articles/:id/view, let's support it:
      const { prisma } = require('../../config/database');
      await prisma.article.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });

      res.status(200).json({
        success: true,
        message: 'Article view incremented successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const isActive = req.query.isActive !== 'false';
      const categories = await WebsiteService.getCategories({ isActive });

      res.status(200).json({
        success: true,
        message: 'Categories retrieved successfully',
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const category = await WebsiteService.getCategoryBySlug(slug);

      res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryTree(req: Request, res: Response, next: NextFunction) {
    try {
      const tree = await WebsiteService.getCategoryTree();

      res.status(200).json({
        success: true,
        message: 'Category tree retrieved successfully',
        data: tree,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAdsBySlot(req: Request, res: Response, next: NextFunction) {
    try {
      const slotCode = req.params.slotCode as string;
      const ads = await WebsiteService.getAdsBySlot(slotCode);

      res.status(200).json({
        success: true,
        message: 'Ads retrieved successfully',
        data: ads,
      });
    } catch (error) {
      next(error);
    }
  }

  static async trackAdImpression(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { slotCode } = req.body;
      const result = await WebsiteService.trackAdImpression(id, slotCode || '');

      res.status(200).json({
        success: true,
        message: 'Ad impression tracked successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async trackAdClick(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { slotCode } = req.body;
      const result = await WebsiteService.trackAdClick(id, slotCode || '');

      res.status(200).json({
        success: true,
        message: 'Ad click tracked successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async subscribeNewsletter(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name } = req.body;
      const result = await WebsiteService.subscribeNewsletter(email, name);

      res.status(200).json({
        success: true,
        message: 'Subscribed to newsletter successfully',
        data: result.subscriber,
      });
    } catch (error) {
      next(error);
    }
  }
}
