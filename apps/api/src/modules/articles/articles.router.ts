import { Router } from 'express';
import { ArticlesController } from './articles.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import {
  createArticleSchema,
  updateArticleSchema,
  articleQuerySchema,
  bulkDeleteArticlesSchema,
} from './articles.validation';

const router: Router = Router();

router.use(AuthMiddleware.authenticate);

router.get(
  '/',
  PermissionMiddleware.checkModule('ARTICLES', 'view'),
  ValidationMiddleware.validate(articleQuerySchema, 'query'),
  ArticlesController.getArticles
);

router.get(
  '/:id',
  PermissionMiddleware.checkModule('ARTICLES', 'view'),
  ArticlesController.getArticleById
);

router.post(
  '/',
  PermissionMiddleware.checkModule('ARTICLES', 'create'),
  ValidationMiddleware.validate(createArticleSchema),
  ArticlesController.createArticle
);

router.put(
  '/:id',
  PermissionMiddleware.checkModule('ARTICLES', 'edit'),
  ValidationMiddleware.validate(updateArticleSchema),
  ArticlesController.updateArticle
);

router.delete(
  '/:id',
  PermissionMiddleware.checkModule('ARTICLES', 'delete'),
  ArticlesController.deleteArticle
);

router.post(
  '/bulk-delete',
  PermissionMiddleware.checkModule('ARTICLES', 'delete'),
  ValidationMiddleware.validate(bulkDeleteArticlesSchema),
  ArticlesController.bulkDeleteArticles
);

export { router as articlesRouter };
