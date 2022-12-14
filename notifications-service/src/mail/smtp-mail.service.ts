import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';

@Injectable()
export class SMTPMailService implements MailService {
  sendMail(): string {
    return 'Sending mail via SMTP';
  }
}
