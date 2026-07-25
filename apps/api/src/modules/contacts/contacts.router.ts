import { Router } from 'express';
import { ContactsController } from './contacts.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PermissionMiddleware } from '../../middleware/permission.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';

const router: Router = Router();

// Apply auth middleware to all routes
router.use(AuthMiddleware.authenticate);

router.get(
  '/', 
  PermissionMiddleware.checkModule('CONTACTS', 'view'), 
  ContactsController.getContacts
);
router.get(
  '/:id', 
  PermissionMiddleware.checkModule('CONTACTS', 'view'), 
  ContactsController.getContactById
);
router.patch(
  '/:id/read', 
  PermissionMiddleware.checkModule('CONTACTS', 'edit'), 
  ContactsController.markAsRead
);
router.delete(
  '/:id', 
  PermissionMiddleware.checkModule('CONTACTS', 'delete'), 
  ContactsController.deleteContact
);
router.post(
  '/bulk-delete', 
  PermissionMiddleware.checkModule('CONTACTS', 'delete'), 
  ContactsController.bulkDelete
);

export { router as contactsRouter };
