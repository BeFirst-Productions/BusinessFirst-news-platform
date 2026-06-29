import { Router } from 'express';
import { NotificationsController } from './notifications.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { notificationQuerySchema } from './notifications.validation';

const router: Router = Router();

// The stream endpoint handles JWT authentication internally via query parameter
// because EventSource does not support custom headers natively.
router.get('/stream', NotificationsController.stream);

// Protect all other routes with the standard AuthMiddleware
router.use(AuthMiddleware.authenticate);

router.get(
  '/',
  ValidationMiddleware.validate(notificationQuerySchema, 'query'),
  NotificationsController.getUserNotifications
);

router.patch('/:id/read', NotificationsController.markAsRead);
router.patch('/read-all', NotificationsController.markAllAsRead);
router.delete('/', NotificationsController.clearAll);
router.delete('/:id', NotificationsController.deleteNotification);

export { router as notificationsRouter };
