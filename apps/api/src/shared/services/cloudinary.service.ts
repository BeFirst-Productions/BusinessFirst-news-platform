import { v2 as cloudinary } from 'cloudinary';
import { env } from '../../config/env';
import { AppError } from '../errors/AppError';
import { Readable } from 'stream';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export class CloudinaryService {
  static async uploadBuffer(
    buffer: Buffer,
    folder: string,
    resourceType: 'image' | 'video' | 'raw' = 'image',
    originalMimeType?: string
  ): Promise<string> {
    // Check if Cloudinary is configured
    if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
      return new Promise((resolve, reject) => {
        const uploadOptions: any = {
          folder: `business_first/${folder}`,
          resource_type: resourceType,
        };

        // Apply automatic compression & optimization
        if (resourceType === 'image') {
          uploadOptions.quality = 'auto';
          uploadOptions.fetch_format = 'auto';
        } else if (resourceType === 'video') {
          uploadOptions.quality = 'auto';
        }

        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(new AppError('Failed to upload file to Cloudinary', 500));
            }
            resolve(result!.secure_url);
          }
        );

        Readable.from(buffer).pipe(uploadStream);
      });
    }

    // Fallback: Local file upload
    console.warn('⚠️ Cloudinary is not configured. Falling back to local upload.');
    try {
      let fileExt = 'bin';
      if (originalMimeType) {
        fileExt = originalMimeType.split('/')[1] || 'bin';
      } else {
        // Fallback guess based on resourceType
        fileExt = resourceType === 'image' ? 'jpg' : resourceType === 'video' ? 'mp4' : 'bin';
      }
      
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const uploadDir = path.resolve(__dirname, '../../../uploads');
      
      // Ensure local upload folder exists
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      
      return `${env.API_URL}/uploads/${fileName}`;
    } catch (err) {
      console.error('Local upload fallback error:', err);
      throw new AppError('Failed to upload file locally', 500);
    }
  }
}
