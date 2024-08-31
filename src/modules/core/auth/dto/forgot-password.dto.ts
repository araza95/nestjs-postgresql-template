// Nest JS
import { ApiProperty } from '@nestjs/swagger';

// Class-validator
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty({
    description: 'Email of the user',
    example: 'aliraza@zenkodes.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'OTP code',
    example: 12345,
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @ApiProperty({
    description: 'New password',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
