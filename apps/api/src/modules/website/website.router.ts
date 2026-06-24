import { Router } from 'express';
import { WebsiteController } from './website.controller';

const router: Router = Router();

// Article endpoints
router.get('/articles', WebsiteController.getArticles);
router.get('/articles/slug/:slug', WebsiteController.getArticleBySlug);
router.get('/articles/:id/related', WebsiteController.getRelatedArticles);
router.post('/articles/:id/view', WebsiteController.incrementArticleView);

// Category endpoints
router.get('/categories', WebsiteController.getCategories);
router.get('/categories/tree', WebsiteController.getCategoryTree);
router.get('/categories/slug/:slug', WebsiteController.getCategoryBySlug);

// Ad endpoints
router.get('/ads/slot/:slotCode', WebsiteController.getAdsBySlot);
router.post('/ads/:id/impression', WebsiteController.trackAdImpression);
router.post('/ads/:id/click', WebsiteController.trackAdClick);

// Newsletter subscription
router.post('/newsletter/subscribe', WebsiteController.subscribeNewsletter);

export { router as websiteRouter };
