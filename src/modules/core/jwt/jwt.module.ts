// Nest JS
import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

// Services
import { JwtUserService } from './services/jwt-user.service';
import { JwtAdminService } from './services/jwt-admin.service';

@Module({
  imports: [NestJwtModule.register({})],
  providers: [JwtUserService, JwtAdminService],
  exports: [JwtUserService, JwtAdminService],
})
export class JwtModule {}
