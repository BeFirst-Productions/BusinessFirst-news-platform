import { Router } from 'express';
import { NewsletterController } from './newsletter.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import {
  subscribeSchema,
  newsletterQuerySchema,
  bulkDeleteSubscribersSchema,
  createCampaignSchema,
  sendCampaignSchema,
  campaignQuerySchema,
} from './newsletter.validation';

const router: Router = Router();

// ── Public Routes (no auth required) ─────────────────────────────────────────

// POST /api/v1/newsletter/subscribe
router.post(
  '/subscribe',
  ValidationMiddleware.validate(subscribeSchema),
  NewsletterController.subscribe,
);

// POST /api/v1/newsletter/test-subscribe (For manual testing and notifications test)
router.post(
  '/test-subscribe',
  ValidationMiddleware.validate(subscribeSchema),
  NewsletterController.testSubscribe,
);

// GET /api/v1/newsletter/unsubscribe?token=...
router.get('/unsubscribe', NewsletterController.unsubscribe);

// ── Protected Admin Routes ────────────────────────────────────────────────────
router.use(AuthMiddleware.authenticate);

// Subscribers
router.get(
  '/subscribers',
  PermissionMiddleware.checkModule('NEWSLETTER', 'view'),
  ValidationMiddleware.validate(newsletterQuerySchema, 'query'),
  NewsletterController.getSubscribers,
);

router.get(
  '/subscribers/stats',
  PermissionMiddleware.checkModule('NEWSLETTER', 'view'),
  NewsletterController.getSubscriberStats,
);

router.get(
  '/subscribers/export',
  PermissionMiddleware.checkModule('NEWSLETTER', 'view'),
  NewsletterController.exportSubscribers,
);

router.delete(
  '/subscribers/:id',
  PermissionMiddleware.checkModule('NEWSLETTER', 'delete'),
  NewsletterController.deleteSubscriber,
);

router.post(
  '/subscribers/bulk-delete',
  PermissionMiddleware.checkModule('NEWSLETTER', 'delete'),
  ValidationMiddleware.validate(bulkDeleteSubscribersSchema),
  NewsletterController.bulkDeleteSubscribers,
);

// Campaigns
router.get(
  '/campaigns',
  PermissionMiddleware.checkModule('NEWSLETTER', 'view'),
  ValidationMiddleware.validate(campaignQuerySchema, 'query'),
  NewsletterController.getCampaigns,
);

router.get(
  '/campaigns/:id',
  PermissionMiddleware.checkModule('NEWSLETTER', 'view'),
  NewsletterController.getCampaignById,
);

router.post(
  '/campaigns',
  PermissionMiddleware.checkModule('NEWSLETTER', 'create'),
  ValidationMiddleware.validate(createCampaignSchema),
  NewsletterController.createCampaign,
);

router.post(
  '/campaigns/send',
  PermissionMiddleware.checkModule('NEWSLETTER', 'create'),
  ValidationMiddleware.validate(sendCampaignSchema),
  NewsletterController.createAndSend,
);

router.post(
  '/campaigns/:id/send',
  PermissionMiddleware.checkModule('NEWSLETTER', 'create'),
  NewsletterController.sendCampaign,
);

export { router as newsletterRouter };
