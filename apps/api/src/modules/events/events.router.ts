import { Router } from 'express';
import { EventsController } from './events.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { createEventSchema, updateEventSchema } from './events.validation';

const router: Router = Router();

router.use(AuthMiddleware.authenticate);

router.get(
  '/',
  PermissionMiddleware.checkModule('EVENTS', 'view'),
  EventsController.getAll
);

router.get(
  '/:id',
  PermissionMiddleware.checkModule('EVENTS', 'view'),
  EventsController.getById
);

router.post(
  '/',
  PermissionMiddleware.checkModule('EVENTS', 'create'),
  ValidationMiddleware.validate(createEventSchema),
  EventsController.create
);

router.put(
  '/:id',
  PermissionMiddleware.checkModule('EVENTS', 'edit'),
  ValidationMiddleware.validate(updateEventSchema),
  EventsController.update
);

router.delete(
  '/:id',
  PermissionMiddleware.checkModule('EVENTS', 'delete'),
  EventsController.delete
);

export { router as eventsRouter };
