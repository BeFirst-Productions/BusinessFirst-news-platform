import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';

const router: Router = Router();

router.use(AuthMiddleware.authenticate);

router.get(
  '/dashboard',
  PermissionMiddleware.checkModule('DASHBOARD', 'view'),
  AnalyticsController.getDashboardStats
);

router.get(
  '/realtime',
  PermissionMiddleware.checkModule('ANALYTICS', 'view'),
  AnalyticsController.getRealtimeStats
);

router.get(
  '/historical',
  PermissionMiddleware.checkModule('ANALYTICS', 'view'),
  AnalyticsController.getHistoricalStats
);

router.get(
  '/search-console',
  PermissionMiddleware.checkModule('ANALYTICS', 'view'),
  AnalyticsController.getSearchConsoleStats
);

router.get(
  '/geo',
  PermissionMiddleware.checkModule('ANALYTICS', 'view'),
  AnalyticsController.getGeoStats
);

export { router as analyticsRouter };
