import { prisma } from '../../config/database';
import { NotFoundError } from '../../shared/errors/AppError';
import { NotificationQueryInput } from './notifications.validation';
import { notificationEmitter } from '../../events/notification.events';
import { Role } from '../../generated/prisma';

export class NotificationsService {
  static async getUserNotifications(userId: string, query: NotificationQueryInput) {
    const page = Math.max(1, query.page);
    const limit = Math.max(1, Math.min(100, query.limit));
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({
        where: { userId },
      }),
    ]);

    return { notifications, total };
  }

  static async markAsRead(userId: string, notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new NotFoundError('Notification not found');
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    return updated;
  }

  static async markAllAsRead(userId: string) {
    const result = await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    return result;
  }

  static async createNewsletterNotification(email: string, name?: string | null) {
    // Check if notifications are enabled for the newsletter module
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'ui_notification_settings' },
    });

    if (setting) {
      const config = setting.value as { newsletter?: boolean };
      if (config && config.newsletter === false) {
        return; // Notifications disabled for this module
      }
    }

    const admins = await prisma.user.findMany({
      where: {
        role: { in: [Role.SUPERADMIN, Role.ADMIN] },
      },
      orderBy: { role: 'asc' }, // Prioritize SUPERADMIN
    });

    const title = 'New Newsletter Subscriber';
    const message = `${email || 'Someone'} has subscribed to the newsletter.`;

    // Prevent duplicate unread notifications for the same subscription
    const existingUnread = await prisma.notification.findFirst({
      where: {
        title,
        message,
        isRead: false,
      },
    });

    if (existingUnread) {
      return; // Duplicate subscription alert, do not persist or broadcast again
    }

    const primaryAdmin = admins[0];

    if (!primaryAdmin) {
      // If no admin in DB, just emit the event so active panels still see it
      notificationEmitter.emitNotification({
        id: 'new-sub-' + Date.now(),
        title,
        message,
        type: 'SUCCESS',
        createdAt: new Date().toISOString(),
      });
      return;
    }

    // Persist exactly 1 notification record in the DB for the primary admin user
    const createdDbNotification = await prisma.notification.create({
      data: {
        title,
        message,
        type: 'SUCCESS',
        userId: primaryAdmin.id,
      },
    });

    // Broadcast the live SSE event
    notificationEmitter.emitNotification({
      id: createdDbNotification.id,
      title,
      message,
      type: 'SUCCESS',
      createdAt: new Date().toISOString(),
    });
  }

  static async deleteNotification(userId: string, notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new NotFoundError('Notification not found');
    }

    const deleted = await prisma.notification.delete({
      where: { id: notificationId },
    });

    return deleted;
  }

  static async clearAllNotifications(userId: string) {
    const result = await prisma.notification.deleteMany({
      where: { userId },
    });

    return result;
  }
}
