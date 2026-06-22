import { Router } from 'express';
import { TagsController } from './tags.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { createTagSchema, updateTagSchema } from './tags.validation';

const router: Router = Router();

router.use(AuthMiddleware.authenticate);

router.get(
  '/',
  PermissionMiddleware.checkModule('TAGS', 'view'),
  TagsController.getAllTags
);

router.get(
  '/:id',
  PermissionMiddleware.checkModule('TAGS', 'view'),
  TagsController.getTagById
);

router.post(
  '/',
  PermissionMiddleware.checkModule('TAGS', 'create'),
  ValidationMiddleware.validate(createTagSchema),
  TagsController.createTag
);

router.put(
  '/:id',
  PermissionMiddleware.checkModule('TAGS', 'edit'),
  ValidationMiddleware.validate(updateTagSchema),
  TagsController.updateTag
);

router.delete(
  '/:id',
  PermissionMiddleware.checkModule('TAGS', 'delete'),
  TagsController.deleteTag
);

export { router as tagsRouter };
