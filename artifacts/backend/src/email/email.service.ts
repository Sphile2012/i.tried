import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async send(to: string, subject: string, body: string) {
    // TODO: Implement email sending with Nodemailer
    console.log(`Sending email to ${to}: ${subject}`);
  }
}
