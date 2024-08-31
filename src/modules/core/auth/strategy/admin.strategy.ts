// NestJS Common Imports
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

// NestJS Config Service Import
import { ConfigService } from '@nestjs/config';

// NestJS Passport Imports
import { PassportStrategy } from '@nestjs/passport';

// Passport JWT Imports
import { ExtractJwt, Strategy } from 'passport-jwt';

// Entity Imports
import { UserEntity } from 'src/modules/features/user/entities/user.entity';

// Service Imports
import { UserService } from 'src/modules/features/user/user.service';

// JWT Types Import
import { JWT } from 'src/types/common.type';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt_admin') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('app.adminSecret'),
      ignoreExpiration: false,
    });
  }

  async validate({ id }: JWT): Promise<{ user: UserEntity }> {
    try {
      const user = await this.userService.getUserFromDB({ where: { id } });

      if (!user) {
        Logger.error('Invalid token');
        throw new UnauthorizedException('Invalid token');
      }
      return { user };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        Logger.error('Token expired');
        throw new UnauthorizedException('Token expired');
      } else {
        throw error;
      }
    }
  }
}
