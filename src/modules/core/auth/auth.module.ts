// Nest JS
import { Module } from '@nestjs/common';

// Services
import { AuthService } from './service/user-auth.service';

// Controllers
import { AuthController } from './controller/user-auth.controller';

// Strategies
import { JwtUserStrategy } from './strategy/user.strategy';
import { JwtAdminStrategy } from './strategy/admin.strategy';

// Modules
import { UserModule } from 'src/modules/features/user/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { OtpModule } from 'src/modules/features/otp/otp.module';

@Module({
  imports: [UserModule, JwtModule, OtpModule],
  controllers: [AuthController],
  providers: [JwtUserStrategy, JwtAdminStrategy, AuthService],
})
export class AuthModule {}
