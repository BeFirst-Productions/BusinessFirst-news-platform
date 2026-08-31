import { Request, Response, NextFunction } from 'express';
import { BunnyService } from '../../shared/services/bunny.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { AppError } from '../../shared/errors/AppError';
import { SlugUtil } from '../../shared/utils/slug.util';

export class MediaController {
  static async uploadMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[] | undefined;
      const customName = req.query.customName as string | undefined;
      const folder = (req.query.folder as string) || 'editor';

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

        let slugifiedName: string | undefined = undefined;
        if (customName) {
          slugifiedName = SlugUtil.generate(customName, false);
        }

        const url = await BunnyService.uploadBuffer(
          file.buffer,
          folder,
          resourceType,
          file.mimetype,
          slugifiedName
        );
        return { url };
      });

      const urls = await Promise.all(uploadPromises);
      ResponseUtil.success(res, urls, 'Files uploaded successfully');
    } catch (error) {
      next(error);
    }
  }
}
