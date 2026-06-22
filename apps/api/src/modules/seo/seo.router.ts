import { Router } from 'express';
import { SeoController } from './seo.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { updatePageSeoSchema, pageSeoQuerySchema } from './seo.validation';

const router: Router = Router();

// ── Public endpoint (web front-end, no auth required) ───────
// Uses a wildcard to allow slugs containing forward slashes
// e.g. /seo/public/by-slug/category/tech
router.get(
  '/public/by-slug/*',
  (req, res, next) => {
    // Express stores the wildcard match in req.params[0]
    req.params.slug = (req.params as any)[0] ?? '';
    next();
  },
  SeoController.getPageSeoBySlug
);

// ── All remaining routes require authentication ──────────────
router.use(AuthMiddleware.authenticate);

// List all SEO records (paginated + filterable)
router.get(
  '/',
  PermissionMiddleware.checkModule('SEO', 'view'),
  ValidationMiddleware.validate(pageSeoQuerySchema, 'query'),
  SeoController.getAllPageSeo
);

// Get single record by ID
router.get(
  '/:id',
  PermissionMiddleware.checkModule('SEO', 'view'),
  SeoController.getPageSeoById
);

// Seed missing category SEO records
router.post(
  '/seed-categories',
  PermissionMiddleware.checkModule('SEO', 'create'),
  SeoController.seedCategorySeoRecords
);

// Update existing SEO record (the ONLY admin mutation)
router.put(
  '/:id',
  PermissionMiddleware.checkModule('SEO', 'edit'),
  ValidationMiddleware.validate(updatePageSeoSchema),
  SeoController.updatePageSeo
);

// NOTE: DELETE and POST (create) are intentionally absent.
// SEO records are tied to pages that must always exist.
// New pages are added via code (PRESET_PAGES in seo.service.ts).

export { router as seoRouter };
