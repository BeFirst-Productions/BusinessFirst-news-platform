import { Request, Response, NextFunction } from 'express';
import { EventsService } from './events.service';
import { ResponseUtil } from '../../shared/utils/response.util';

export class EventsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      let isActive: boolean | undefined = undefined;
      
      if (query.isActive !== undefined) {
        isActive = query.isActive === 'true';
      }

      const result = await EventsService.getAll({
        page: Number(query.page),
        limit: Number(query.limit),
        isActive,
      });

      ResponseUtil.success(res, result.data, 'Events retrieved successfully', 200, result.metadata);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventsService.getById(id as string);

      ResponseUtil.success(res, event, 'Event retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await EventsService.create(req.body);

      ResponseUtil.created(res, event, 'Event created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventsService.update(id as string, req.body);

      ResponseUtil.success(res, event, 'Event updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await EventsService.delete(id as string);

      ResponseUtil.success(res, null, 'Event deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
