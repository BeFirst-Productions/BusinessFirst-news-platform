import { Router } from 'express';
import { CategoriesController } from './categories.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { createCategorySchema, updateCategorySchema } from './categories.validation';

const router: Router = Router();

router.use(AuthMiddleware.authenticate);

router.get(
  '/',
  PermissionMiddleware.checkModule('CATEGORIES', 'view'),
  CategoriesController.getAllCategories
);

router.get(
  '/:id',
  PermissionMiddleware.checkModule('CATEGORIES', 'view'),
  CategoriesController.getCategoryById
);

router.post(
  '/',
  PermissionMiddleware.checkModule('CATEGORIES', 'create'),
  ValidationMiddleware.validate(createCategorySchema),
  CategoriesController.createCategory
);

router.put(
  '/:id',
  PermissionMiddleware.checkModule('CATEGORIES', 'edit'),
  ValidationMiddleware.validate(updateCategorySchema),
  CategoriesController.updateCategory
);

router.delete(
  '/:id',
  PermissionMiddleware.checkModule('CATEGORIES', 'delete'),
  CategoriesController.deleteCategory
);

export { router as categoriesRouter };
