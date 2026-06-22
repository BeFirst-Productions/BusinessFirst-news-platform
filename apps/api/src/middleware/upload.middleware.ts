import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request, RequestHandler } from 'express';
import { BadRequestError } from '../shared/errors/AppError';
import { env } from '../config/env';
import fs from 'fs';

// Ensure upload directories exist
const uploadDirs = ['images', 'videos', 'thumbnails', 'temp'];
uploadDirs.forEach(dir => {
  const fullPath = path.join(env.UPLOAD_PATH, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    let uploadPath = path.join(env.UPLOAD_PATH, 'temp');

    if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(env.UPLOAD_PATH, 'images');
    } else if (file.mimetype.startsWith('video/')) {
      uploadPath = path.join(env.UPLOAD_PATH, 'videos');
    }

    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueId}${ext}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`File type ${file.mimetype} is not allowed`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE,
    files: 10,
  },
});

export const uploadSingle: RequestHandler = upload.single('file');
export const uploadMultiple: RequestHandler = upload.array('files', 10);
export const uploadFields: RequestHandler = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);