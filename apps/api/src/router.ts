import { Router } from 'express';
import { authRouter } from './modules/auth/auth.router';
import { usersRouter } from './modules/users/users.router';
import { modulesRouter } from './modules/modules/modules.router';
import { categoriesRouter } from './modules/categories/categories.router';
import { tagsRouter } from './modules/tags/tags.router';
import { articlesRouter } from './modules/articles/articles.router';
import { adsRouter } from './modules/ads/ads.router';
import { mediaRouter } from './modules/media/media.router';
import { analyticsRouter } from './modules/analytics/analytics.router';
import { settingsRouter } from './modules/settings/settings.router';
import { newsletterRouter } from './modules/newsletter/newsletter.router';
import { seoRouter } from './modules/seo/seo.router';
import { websiteRouter } from './modules/website/website.router';
import { notificationsRouter } from './modules/notifications/notifications.router';
import { searchRouter } from './modules/search/search.router';

const router:Router = Router();

// Health check (public)
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'BusinessFirst News API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mount routes
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/modules', modulesRouter);
router.use('/categories', categoriesRouter);
router.use('/tags', tagsRouter);
router.use('/articles', articlesRouter);
router.use('/ads', adsRouter);
router.use('/media', mediaRouter);
router.use('/analytics', analyticsRouter);
router.use('/settings', settingsRouter);
router.use('/newsletter', newsletterRouter);
router.use('/seo', seoRouter);
router.use('/website', websiteRouter);
router.use('/notifications', notificationsRouter);
router.use('/search', searchRouter);

export { router };