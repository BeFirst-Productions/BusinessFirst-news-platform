import { Request, Response, NextFunction } from 'express';
import { NotificationsService } from './notifications.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import { JwtUtil } from '../../shared/utils/jwt.util';
import { prisma } from '../../config/database';
import { UserStatus, Role } from '../../generated/prisma';
import { notificationEmitter, RealtimeNotification } from '../../events/notification.events';
import { NotificationQueryInput } from './notifications.validation';

export class NotificationsController {
  static async getUserNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const query = req.query as unknown as NotificationQueryInput;
      const { notifications, total } = await NotificationsService.getUserNotifications(userId, query);

      ResponseUtil.paginated(
        res,
        notifications,
        total,
        query.page,
        query.limit,
        'Notifications retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      const notificationId = req.params.id as string;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await NotificationsService.markAsRead(userId, notificationId);
      ResponseUtil.success(res, updated, 'Notification marked as read');
    } catch (error) {
      next(error);
    }
  }

  static async markAllAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const result = await NotificationsService.markAllAsRead(userId);
      ResponseUtil.success(res, result, 'All notifications marked as read');
    } catch (error) {
      next(error);
    }
  }

  static async stream(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.query.token as string;
      if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        return;
      }

      let decoded;
      try {
        decoded = JwtUtil.verifyAccessToken(token);
      } catch (err) {
        res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        return;
      }

      // Verify user exists, is active and is an admin/superadmin
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          role: true,
          status: true,
        },
      });

      if (!user || user.status !== UserStatus.ACTIVE || (user.role !== Role.ADMIN && user.role !== Role.SUPERADMIN)) {
        res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
        return;
      }

      // Set headers for SSE
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      });

      // Send initial comment to keep connection open and confirm connection
      res.write(': open\n\n');
      if (typeof (res as any).flush === 'function') {
        (res as any).flush();
      }

      const handleNotification = (notification: RealtimeNotification) => {
        res.write(`data: ${JSON.stringify(notification)}\n\n`);
        if (typeof (res as any).flush === 'function') {
          (res as any).flush();
        }
      };

      notificationEmitter.onNotification(handleNotification);

      // Clean up on client disconnect
      req.on('close', () => {
        notificationEmitter.offNotification(handleNotification);
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      const notificationId = req.params.id as string;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const deleted = await NotificationsService.deleteNotification(userId, notificationId);
      ResponseUtil.success(res, deleted, 'Notification deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async clearAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const result = await NotificationsService.clearAllNotifications(userId);
      ResponseUtil.success(res, result, 'All notifications cleared successfully');
    } catch (error) {
      next(error);
    }
  }
}
