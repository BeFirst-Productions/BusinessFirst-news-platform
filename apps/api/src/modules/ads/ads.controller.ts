import { Request, Response, NextFunction } from 'express';
import { AdsService } from './ads.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { AdQueryInput } from './ads.validation';

export class AdsController {
  static async getAds(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as AdQueryInput;
      const { ads, total } = await AdsService.getAds(query);
      ResponseUtil.paginated(res, ads, total, query.page, query.limit);
    } catch (error) {
      next(error);
    }
  }

  static async getAdById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const ad = await AdsService.getAdById(id);
      ResponseUtil.success(res, ad);
    } catch (error) {
      next(error);
    }
  }

  static async createAd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res);
        return;
      }
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const adFiles = {
        image: files?.['image']?.[0],
        video: files?.['video']?.[0],
      };
console.log(req.body);

      const ad = await AdsService.createAd(req.body, adFiles, req.user.userId);
      ResponseUtil.created(res, ad, 'Advertisement created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateAd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const adFiles = {
        image: files?.['image']?.[0],
        video: files?.['video']?.[0],
      };

      const ad = await AdsService.updateAd(id, req.body, adFiles);
      ResponseUtil.success(res, ad, 'Advertisement updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteAd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const result = await AdsService.deleteAd(id);
      ResponseUtil.success(res, result, 'Advertisement deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
