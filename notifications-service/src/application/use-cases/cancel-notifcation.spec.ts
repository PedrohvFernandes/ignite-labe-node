import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositorie';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification use case', () => {
  it('should be able to Cancel a notification', async () => {
    // Bd em memoria em class:
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    console.log(notificationsRepository.notifications);
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to Cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow('Notification not found');
  });
});
