import { SendNotification } from '@application/use-cases/send-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
// import { randomUUID } from 'node:crypto';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-models';

@Controller('notifications')
export class NotificationsController {
  // constructor(private readonly prismaService: PrismaService) {}
  // Injetando dependencia: o caso de uso
  constructor(
    private sendNotificationUseCase: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipient: CountRecipientNotifications,
    private getRecipient: GetRecipientNotifications,
  ) {}

  // @Get()
  // list() {
  //   return this.prismaService.notification.findMany();
  // }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipient.execute({
      recipientId,
    });
    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipient.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    // await this.prismaService.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     content,
    //     category,
    //     recipientId,
    //   },
    // });
    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
