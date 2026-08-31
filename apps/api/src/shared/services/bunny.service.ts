import { env } from '../../config/env';
import { AppError } from '../errors/AppError';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

export class BunnyService {
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

    // Check if Bunny.net is configured
    if (env.BUNNY_STORAGE_ZONE && env.BUNNY_STORAGE_API_KEY && env.BUNNY_PULL_ZONE_URL) {
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
        
        const storagePath = `business_first/${folder}/${fileName}`;
        let regionPrefix = '';
        if (env.BUNNY_STORAGE_REGION) {
          const region = env.BUNNY_STORAGE_REGION.toLowerCase();
          // Map valid non-default regions, otherwise use no prefix (Falkenstein/DE)
          if (['ny', 'la', 'sg', 'syd', 'uk'].includes(region)) {
            regionPrefix = `${region}.`;
          }
        }
        const url = `https://${regionPrefix}storage.bunnycdn.com/${env.BUNNY_STORAGE_ZONE}/${storagePath}`;

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'AccessKey': env.BUNNY_STORAGE_API_KEY,
            'Content-Type': 'application/octet-stream',
          },
          body: buffer as any
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Bunny.net upload error:', response.status, errorText);
          throw new AppError(`Failed to upload file to Bunny.net: ${response.statusText}`, 500);
        }

        // Return the pull zone URL
        return `${env.BUNNY_PULL_ZONE_URL}/${storagePath}`;
      } catch (error) {
        console.error('Bunny.net upload exception:', error);
        throw new AppError('Failed to upload file to Bunny.net', 500);
      }
    }

    // Fallback: Local file upload
    console.warn('⚠️ Bunny.net is not configured. Falling back to local upload.');
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

  static async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl) return;

    if (env.BUNNY_STORAGE_ZONE && env.BUNNY_STORAGE_API_KEY && env.BUNNY_PULL_ZONE_URL) {
      if (fileUrl.startsWith(env.BUNNY_PULL_ZONE_URL)) {
        try {
          const storagePath = fileUrl.replace(`${env.BUNNY_PULL_ZONE_URL}/`, '');
          let regionPrefix = '';
          if (env.BUNNY_STORAGE_REGION) {
            const region = env.BUNNY_STORAGE_REGION.toLowerCase();
            if (['ny', 'la', 'sg', 'syd', 'uk'].includes(region)) {
              regionPrefix = `${region}.`;
            }
          }
          const url = `https://${regionPrefix}storage.bunnycdn.com/${env.BUNNY_STORAGE_ZONE}/${storagePath}`;
          
          await fetch(url, {
            method: 'DELETE',
            headers: {
              'AccessKey': env.BUNNY_STORAGE_API_KEY,
            },
          });
          console.log(`[BunnyService] Deleted file from CDN: ${fileUrl}`);
        } catch (error) {
          console.error('[BunnyService] Failed to delete file from Bunny CDN:', error);
        }
      }
    } else {
      // Local deletion
      if (fileUrl.startsWith(`${env.API_URL}/uploads/`)) {
        try {
          const fileName = fileUrl.split('/uploads/')[1];
          if (fileName) {
            const filePath = path.resolve(__dirname, '../../../uploads', fileName);
            await fs.unlink(filePath).catch(() => {});
            console.log(`[BunnyService] Deleted local file: ${fileName}`);
          }
        } catch (error) {
          console.error('[BunnyService] Failed to delete local file:', error);
        }
      }
    }
  }
}
