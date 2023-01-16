// Interfaces são os contratos(metodos) que as classes, nesse caso é o repositorio deve seguir, mas, que não são implementadas obrigatoriamente. No nest é melhor usar class abstrata para fazer inversão de dependência, pois ele trabalha melhor com class abstrata porque ele lida com injeção de dependência.

import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}
