import { Request, Response, NextFunction } from 'express';
import { SettingsService } from './settings.service';
import { ResponseUtil } from '../../shared/utils/response.util';

export class SettingsController {
  static async getAllSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await SettingsService.getAllSettings();
      ResponseUtil.success(res, settings, 'Settings retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getPublicSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await SettingsService.getPublicSettings();
      ResponseUtil.success(res, settings, 'Public settings retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res);
        return;
      }
      const updated = await SettingsService.updateSettings(req.body, req.user.userId);
      ResponseUtil.success(res, updated, 'Settings updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
