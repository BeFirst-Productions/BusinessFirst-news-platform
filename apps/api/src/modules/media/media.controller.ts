import { Request, Response, NextFunction } from 'express';
import { CloudinaryService } from '../../shared/services/cloudinary.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { AppError } from '../../shared/errors/AppError';

export class MediaController {
  static async uploadMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[] | undefined;
      
      if (!files || files.length === 0) {
        throw new AppError('No files uploaded', 400);
      }

      const uploadPromises = files.map(async (file) => {
        let resourceType: 'image' | 'video' | 'raw' = 'raw';
        if (file.mimetype.startsWith('image/')) {
          resourceType = 'image';
        } else if (file.mimetype.startsWith('video/')) {
          resourceType = 'video';
        }

        const url = await CloudinaryService.uploadBuffer(file.buffer, 'editor', resourceType, file.mimetype);
        return { url };
      });

      const urls = await Promise.all(uploadPromises);
      ResponseUtil.success(res, urls, 'Files uploaded successfully');
    } catch (error) {
      next(error);
    }
  }
}
