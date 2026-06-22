import { Router } from 'express';
import multer from 'multer';
import { MediaController } from './media.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';

const router: Router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
  },
});

router.use(AuthMiddleware.authenticate);

router.post(
  '/upload',
  PermissionMiddleware.checkModule('MEDIA', 'create'),
  upload.array('files', 10), // support up to 10 files concurrently
  MediaController.uploadMedia
);

export { router as mediaRouter };
