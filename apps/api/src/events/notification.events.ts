import { EventEmitter } from 'events';

export interface RealtimeNotification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  createdAt: string;
}

class NotificationEmitter extends EventEmitter {
  emitNotification(notification: RealtimeNotification): void {
    this.emit('notification', notification);
  }

  onNotification(handler: (notification: RealtimeNotification) => void): void {
    this.on('notification', handler);
  }

  offNotification(handler: (notification: RealtimeNotification) => void): void {
    this.off('notification', handler);
  }
}

export const notificationEmitter = new NotificationEmitter();
