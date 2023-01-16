import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositorie';
import { UnreadNotification } from './unread-notification';

describe('Unread notification use case', () => {
  it('should be able to Unread a notification', async () => {
    // Bd em memoria em class:
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });
    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    console.log(notificationsRepository.notifications);
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to Unread a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow('Notification not found');
  });
});
