import { Router } from 'express';
import { WebsiteController } from './website.controller';

const router: Router = Router();

// Home content endpoint
router.get('/home-content', WebsiteController.getHomeContent);
router.get('/home-categories', WebsiteController.getHomeCategories);
router.get('/articles', WebsiteController.getArticles);
router.get('/articles/slug/:slug', WebsiteController.getArticleBySlug);
router.get('/articles/:id/related', WebsiteController.getRelatedArticles);
router.post('/articles/:id/view', WebsiteController.incrementArticleView);

// Category endpoints
router.get('/categories', WebsiteController.getCategories);
router.get('/categories/tree', WebsiteController.getCategoryTree);
router.get('/categories/slug/:slug', WebsiteController.getCategoryBySlug);

// Ad endpoints
router.get(
  '/ads',
  WebsiteController.getAds
);

router.get(
  '/ads/:id',
  WebsiteController.getAdById
);

router.get(
  '/ads/slot/:slotCode',
  WebsiteController.getAdsBySlot
);

router.post(
  '/ads/:id/impression',
  WebsiteController.trackAdImpression
);

router.post(
  '/ads/:id/click',
  WebsiteController.trackAdClick
);

// Newsletter subscription
// Newsletter subscription
router.post('/newsletter/subscribe', WebsiteController.subscribeNewsletter);

// Contact form submission
router.post('/contacts', WebsiteController.submitContactForm);

export { router as websiteRouter };
