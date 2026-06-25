import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { 
  loginSchema, 
  registerSchema, 
  changePasswordSchema,
  updateProfileSchema 
} from './auth.validation';

const router: Router = Router();

// Public routes
router.post(
  '/login',
  ValidationMiddleware.validate(loginSchema),
  AuthController.login
);

router.post(
  '/refresh-token',
  AuthController.refreshToken
);

// Protected routes
router.post(
  '/register',
  AuthMiddleware.authenticate,
  PermissionMiddleware.canCreateUsers,
  ValidationMiddleware.validate(registerSchema),
  AuthController.register
);

router.post(
  '/logout',
  AuthMiddleware.authenticate,
  AuthController.logout
);

router.post(
  '/change-password',
  AuthMiddleware.authenticate,
  ValidationMiddleware.validate(changePasswordSchema),
  AuthController.changePassword
);

router.get(
  '/profile',
  AuthMiddleware.authenticate,
  AuthController.getProfile
);

router.put(
  '/profile',
  AuthMiddleware.authenticate,
  ValidationMiddleware.validate(updateProfileSchema),
  AuthController.updateProfile
);

export { router as authRouter };