import { Router } from 'express';
import { UsersController } from './users.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { 
  createUserSchema, 
  updateUserSchema, 
  updateUserPermissionsSchema,
  userQuerySchema,
} from './users.validation';

const router:Router = Router();

// All routes require authentication
router.use(AuthMiddleware.authenticate);

// Get all users (with pagination)
router.get(
  '/',
  PermissionMiddleware.checkModule('USERS', 'view'),
  ValidationMiddleware.validate(userQuerySchema, 'query'),
  UsersController.getUsers
);

// Get user by ID
router.get(
  '/:id',
  PermissionMiddleware.checkModule('USERS', 'view'),
  UsersController.getUserById
);

// Create user
router.post(
  '/',
  PermissionMiddleware.checkModule('USERS', 'create'),
  PermissionMiddleware.canCreateUsers,
  ValidationMiddleware.validate(createUserSchema),
  UsersController.createUser
);

// Update user
router.put(
  '/:id',
  PermissionMiddleware.checkModule('USERS', 'edit'),
  ValidationMiddleware.validate(updateUserSchema),
  UsersController.updateUser
);

// Delete user
router.delete(
  '/:id',
  PermissionMiddleware.checkModule('USERS', 'delete'),
  UsersController.deleteUser
);

// Update user permissions (SUPERADMIN only)
router.put(
  '/:id/permissions',
  AuthMiddleware.authorize('SUPERADMIN'),
  ValidationMiddleware.validate(updateUserPermissionsSchema),
  UsersController.updateUserPermissions
);

// Get user permissions
router.get(
  '/:id/permissions',
  PermissionMiddleware.checkModule('USERS', 'view'),
  UsersController.getUserPermissions
);

export { router as usersRouter };