// Nest JS
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Types
import { JWT } from 'src/types/common.type';

@Injectable()
export class JwtAdminService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateAuthToken({ payload }: { payload: JWT }): string {
    const jwt = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('app.AdminSecret'),
      expiresIn: this.configService.get<number>('app.AdminExpiresIn'),
    });
    return jwt;
  }

  async decodeAuthToken({ token }: { token: string }): Promise<JWT> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('app.AdminSecret'),
      });
    } catch (error) {
      Logger.error('🚀 Decode Auth Token Error', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
