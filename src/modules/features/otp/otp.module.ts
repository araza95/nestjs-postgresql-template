// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { OtpService } from './otp.service';

// Entities
import { OTPTableEntity } from './entity/otp.entity';

// Modules
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([OTPTableEntity]), UserModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
