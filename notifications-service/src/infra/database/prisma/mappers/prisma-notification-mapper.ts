import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  // Conversão para camada de persistencia
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readtAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
  // Conversão para camada de dominio
  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.content,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readtAt,
        canceledAt: raw.canceldAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
