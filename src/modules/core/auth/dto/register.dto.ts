// Nest JS
import { ApiProperty } from '@nestjs/swagger';

// Class-validator
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Custom decorator
import { IsYearMonthDayFormat } from 'src/decorators/IsYearMonthDayFormat.decorator';

export class RegisterDTO {
  @ApiProperty({
    description: 'Email of the user',
    example: 'aliraza@zenkodes.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: '1999-12-31',
  })
  @IsNotEmpty()
  @IsString()
  @IsYearMonthDayFormat()
  date_of_birth: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
