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

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [JwtUserStrategy, JwtAdminStrategy, AuthService],
})
export class AuthModule {}
