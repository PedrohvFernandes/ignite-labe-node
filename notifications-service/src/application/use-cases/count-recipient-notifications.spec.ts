import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositorie';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notification use case', () => {
  it('should be able to count recipient notifications', async () => {
    // Bd em memoria em class:
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    // await notificationsRepository.create(
    //   new Notification({
    //     recipientId: 'recipient-id1',
    //     content: new Content('This is a notification'),
    //     category: 'Social',
    //   }),
    // );
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-id1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-id1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-id2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-id1',
    });

    expect(count).toEqual(2);
  });
});
