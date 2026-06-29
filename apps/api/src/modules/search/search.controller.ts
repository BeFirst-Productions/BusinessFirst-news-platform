import { Request, Response, NextFunction } from 'express';
import { SearchService } from './search.service';
import { ResponseUtil } from '../../shared/utils/response.util';

export class SearchController {
  static async globalSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = req.query.q as string;
      const results = await SearchService.globalSearch(q || '');
      ResponseUtil.success(res, results, 'Search completed successfully');
    } catch (error) {
      next(error);
    }
  }
}
