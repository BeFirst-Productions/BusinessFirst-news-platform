import { Request, Response, NextFunction } from 'express';
import { SeoService } from './seo.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { PageSeoQueryInput } from './seo.validation';

export class SeoController {
  // GET /seo  – admin list (paginated + filtered)
  static async getAllPageSeo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as PageSeoQueryInput;
      const { records, total } = await SeoService.getAllPageSeo(query);
      ResponseUtil.paginated(res, records, total, query.page, query.limit);
    } catch (err) {
      next(err);
    }
  }

  // GET /seo/public/by-slug/:slug  – public (web front-end)
  // Returns a sensible default if no DB record exists.
  static async getPageSeoBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Decode and normalise: strip leading slash, handle encoded slashes
      const rawSlug = req.params.slug ?? '';
      const slug = decodeURIComponent(rawSlug).replace(/^\//, '');
      const record = await SeoService.getPageSeoBySlug(slug);
      ResponseUtil.success(res, record);
    } catch (err) {
      next(err);
    }
  }

  // GET /seo/:id  – admin single record
  static async getPageSeoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await SeoService.getPageSeoById(req.params.id as string);
      ResponseUtil.success(res, record);
    } catch (err) {
      next(err);
    }
  }

  // PUT /seo/:id  – admin update (the ONLY mutation exposed to the admin)
  static async updatePageSeo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await SeoService.updatePageSeo(req.params.id as string, req.body);
      ResponseUtil.success(res, record, 'SEO record updated successfully');
    } catch (err) {
      next(err);
    }
  }

  // POST /seo/seed-categories  – admin utility
  // Creates SEO records for any active category that doesn't have one yet.
  static async seedCategorySeoRecords(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await SeoService.seedCategorySeoRecords();
      ResponseUtil.success(res, result);
    } catch (err) {
      next(err);
    }
  }
}
