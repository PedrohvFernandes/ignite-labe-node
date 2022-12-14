import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
// import { PrismaService } from './prisma.service';
// import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  // constructor(private readonly prismaService: PrismaService) {}
  // Injetando dependencia: o caso de uso
  constructor(private sendNotificationUseCase: SendNotification) {}

  // @Get()
  // list() {
  //   return this.prismaService.notification.findMany();
  // }

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

    return { notification };
  }
}
