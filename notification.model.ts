export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string | number;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  isRead: boolean;
  link?: string;
}
