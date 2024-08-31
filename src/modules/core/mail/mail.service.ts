// Nest JS
import { Injectable } from '@nestjs/common';

// node mailer
import * as nodemailer from 'nodemailer';

// Types
import { MailOptions } from './types';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail({ mailOptions }: { mailOptions: MailOptions }): Promise<void> {
    if (!mailOptions.from) mailOptions.from = process.env.SMTP_EMAIL;

    await this.transporter.sendMail(mailOptions);
  }
}
