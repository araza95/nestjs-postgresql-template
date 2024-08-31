import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/features/user/entities/user.entity';

export class UserLogin {
  @ApiProperty({ name: 'access_token', description: 'Access token' })
  access_token: string;

  @ApiProperty({ name: 'user', description: 'User object' })
  user: UserEntity;
}
