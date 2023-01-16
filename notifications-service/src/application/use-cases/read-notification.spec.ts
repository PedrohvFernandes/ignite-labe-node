import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositorie';
import { ReadNotification } from './read-notification';

describe('Read notification use case', () => {
  it('should be able to Read a notification', async () => {
    // Bd em memoria em class:
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    console.log(notificationsRepository.notifications);
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to Read a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow('Notification not found');
  });
});
