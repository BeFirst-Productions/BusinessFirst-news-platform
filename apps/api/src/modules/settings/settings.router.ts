import { Router } from 'express';
import { SettingsController } from './settings.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { updateSettingsSchema } from './settings.validation';

const router: Router = Router();

// Public route to fetch branding, layout, translation details on app boot / login
router.get('/public', SettingsController.getPublicSettings);

// Protected routes require authentication
router.use(AuthMiddleware.authenticate);

// Get all settings (restricted to view settings permission)
router.get(
  '/',
  PermissionMiddleware.checkModule('SETTINGS', 'view'),
  SettingsController.getAllSettings
);

// Update settings (restricted to edit settings permission)
router.put(
  '/',
  PermissionMiddleware.checkModule('SETTINGS', 'edit'),
  ValidationMiddleware.validate(updateSettingsSchema),
  SettingsController.updateSettings
);

export { router as settingsRouter };
