// Interfaces são os contratos(metodos) que as classes, nesse caso é o repositorio deve seguir, mas, que não são implementadas obrigatoriamente. No nest é melhor usar class abstrata para fazer inversão de dependência, pois ele trabalha melhor com class abstrata porque ele lida com injeção de dependência.

import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}
