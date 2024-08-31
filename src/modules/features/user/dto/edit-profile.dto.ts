import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserEditProfileDTO {
  @ApiProperty({
    example: 'Ali Raza',
    description: 'The name of the User',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://s3.amazonaws.com/taskbook.com/user/profile_001.jpg',
    description: 'The profile picture of the User in URL format',
  })
  @IsOptional()
  @IsString()
  profile_picture: string;
}
