// Nest JS
import { ApiProperty } from '@nestjs/swagger';

// Class-validator
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Enums

export class AdminLoginDTO {
  @ApiProperty({
    description: 'Email of the user',
    example: 'aliraza@zenkoders.com',
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
