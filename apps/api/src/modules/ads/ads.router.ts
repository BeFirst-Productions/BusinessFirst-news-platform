import { Router } from 'express';
import multer from 'multer';
import { AdsController } from './ads.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { createAdSchema, updateAdSchema, adQuerySchema } from './ads.validation';

const router: Router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size to support videos
  },
});

router.get(
  '/',
  ValidationMiddleware.validate(adQuerySchema, 'query'),
  AdsController.getAds
);

router.get(
  '/:id',
  AdsController.getAdById
);

router.use(AuthMiddleware.authenticate);

router.post(
  '/',
  PermissionMiddleware.checkModule('ADS', 'create'),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  ValidationMiddleware.validate(createAdSchema),
  AdsController.createAd
);

router.put(
  '/:id',
  PermissionMiddleware.checkModule('ADS', 'edit'),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  ValidationMiddleware.validate(updateAdSchema),
  AdsController.updateAd
);

router.delete(
  '/:id',
  PermissionMiddleware.checkModule('ADS', 'delete'),
  AdsController.deleteAd
);

export { router as adsRouter };
