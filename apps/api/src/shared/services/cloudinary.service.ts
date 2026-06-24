import { v2 as cloudinary } from 'cloudinary';
import { env } from '../../config/env';
import { AppError } from '../errors/AppError';
import { Readable } from 'stream';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

export class CloudinaryService {
  static async uploadBuffer(
    buffer: Buffer,
    folder: string,
    resourceType: 'image' | 'video' | 'raw' = 'image',
    originalMimeType?: string,
    customName?: string
  ): Promise<string> {
    // Automatically compress image if size exceeds normal limit (1MB)
    if (resourceType === 'image' && buffer.length > 1024 * 1024) {
      try {
        const metadata = await sharp(buffer).metadata();
        const format = metadata.format;

        if (format && ['jpeg', 'jpg', 'png', 'webp', 'heif', 'tiff', 'gif'].includes(format)) {
          let pipeline = sharp(buffer);

          // Limit max width to 1920px for web displays (maintains aspect ratio)
          if (metadata.width && metadata.width > 1920) {
            pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
          }

          // Apply format-specific optimizations
          if (format === 'jpeg' || format === 'jpg') {
            pipeline = pipeline.jpeg({ quality: 80, progressive: true });
          } else if (format === 'png') {
            pipeline = pipeline.png({ quality: 80, palette: true });
          } else if (format === 'webp') {
            pipeline = pipeline.webp({ quality: 80 });
          } else if (format === 'heif') {
            pipeline = pipeline.heif({ quality: 80 });
          } else if (format === 'gif') {
            pipeline = pipeline.gif();
          }

          const compressedBuffer = await pipeline.toBuffer();

          // Use compressed buffer if it is smaller than original
          if (compressedBuffer.length < buffer.length) {
            console.log(
              `[Image Optimization] Automatically compressed image (${format.toUpperCase()}) from ` +
              `${(buffer.length / (1024 * 1024)).toFixed(2)}MB to ${(compressedBuffer.length / (1024 * 1024)).toFixed(2)}MB`
            );
            buffer = compressedBuffer;
          }
        }
      } catch (err) {
        console.error('[Image Optimization] Failed to compress image, using original buffer:', err);
      }
    }
    // Check if Cloudinary is configured
    if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
      return new Promise((resolve, reject) => {
        const uploadOptions: any = {
          folder: `business_first/${folder}`,
          resource_type: resourceType,
        };

        if (customName) {
          uploadOptions.public_id = customName;
          uploadOptions.use_filename = true;
          uploadOptions.unique_filename = true;
        }

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
      
      const fileName = customName 
        ? `${customName}-${crypto.randomBytes(4).toString('hex')}.${fileExt}`
        : `${crypto.randomUUID()}.${fileExt}`;
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
