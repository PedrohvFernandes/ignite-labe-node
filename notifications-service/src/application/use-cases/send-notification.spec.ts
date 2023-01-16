import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositorie';
import { SendNotification } from './send-notification';

// Bd em memoria direto no teste:

// const notifications: Notification[] = [];
// // Repositório de notificações fake, um bd em memória falso
// const notificationRepository = {
//   async create(notification: Notification) {
//     notifications.push(notification);
//   },
// };

describe('Send notification use case', () => {
  it('should be able send a notification', async () => {
    // Bd em memoria em class:
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      content: 'This is a notification',
      category: 'Social',
    });
    console.log(notificationsRepository.notifications);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
