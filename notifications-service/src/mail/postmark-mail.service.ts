import { MailService } from './mail.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostmarkMailService implements MailService {
  sendMail(): string {
    return 'Sending mail via POSTMARK';
  }
}
