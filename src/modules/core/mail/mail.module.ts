// NestJS
import { Global, Module } from '@nestjs/common';

// Services
import { MailService } from './mail.service';

@Global()
@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
