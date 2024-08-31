// Nest JS
import { ApiProperty } from '@nestjs/swagger';

// Class-validator
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'Email of the user',
    example: 'aliraza@zenkodes.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
