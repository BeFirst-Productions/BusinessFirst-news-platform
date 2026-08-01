import { Request, Response, NextFunction } from 'express';
import { ContactsService } from './contacts.service';
import { contactQuerySchema, bulkDeleteSchema } from './contacts.validation';

export class ContactsController {
  static async getContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const query = contactQuerySchema.parse(req.query);
      const result = await ContactsService.getContacts(query);

      res.status(200).json({
        success: true,
        message: 'Contacts retrieved successfully',
        data: result.data,
        metadata: result.metadata,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getContactById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const contact = await ContactsService.getContactById(id);

      res.status(200).json({
        success: true,
        message: 'Contact retrieved successfully',
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const contact = await ContactsService.markAsRead(id);

      res.status(200).json({
        success: true,
        message: 'Contact marked as read',
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ContactsService.deleteContact(id);

      res.status(200).json({
        success: true,
        message: 'Contact deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = bulkDeleteSchema.parse(req.body);
      const result = await ContactsService.bulkDeleteContacts(ids);

      res.status(200).json({
        success: true,
        message: `${result.count} contacts deleted successfully`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
