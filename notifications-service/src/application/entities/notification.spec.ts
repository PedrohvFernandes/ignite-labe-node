import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      category: 'Social',
      content: new Content('Uma nova notificação'),
      createdAt: new Date(),
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
