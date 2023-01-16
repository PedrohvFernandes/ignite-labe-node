import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositorie';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notification use case', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-id1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id1' }),
        expect.objectContaining({ recipientId: 'recipient-id1' }),
      ]),
    );
  });
});
