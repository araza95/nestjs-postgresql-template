// Nest JS
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from '../service/user-auth.service';

// Response and DTO
import { ForgotPasswordDTO } from '../dto/forgot-password.dto';
import { LoginDTO } from '../dto/login.dto';
import { RequestOTPDTO } from '../dto/request-otp.dto';
import { UserLogin } from '../response';

// Guards

// Entities
import { UserEntity } from 'src/modules/features/user/entities/user.entity';

// Utils
import { errorSchema } from 'src/utils/app/error-schema';
import { AdminLoginDTO } from '../dto/admin-login.dto';

@ApiTags('Admin Auth')
@Controller('/admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ========================================== Login ==========================================

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged in.',
    type: UserLogin,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    schema: errorSchema(HttpStatus.BAD_REQUEST),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid OTP.',
    schema: errorSchema(HttpStatus.UNAUTHORIZED),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
    schema: errorSchema(HttpStatus.NOT_FOUND),
  })
  @ApiBody({ type: LoginDTO })
  @Post('/login')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { email, password }: AdminLoginDTO,
  ): Promise<
    | { user: UserEntity; token: string }
    | { message: string; status: HttpStatus }
  > {
    return await this.authService.login({
      email,
      password,
    });
  }

  // ========================================== Request OTP for Forgot Password ==========================================

  @ApiOperation({ summary: 'Request OTP for forgot password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP has been sent to your email.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    schema: errorSchema(HttpStatus.BAD_REQUEST),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid OTP.',
    schema: errorSchema(HttpStatus.UNAUTHORIZED),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
    schema: errorSchema(HttpStatus.NOT_FOUND),
  })
  @ApiBody({ type: RequestOTPDTO })
  @Post('/request-otp')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async requestOTP(
    @Body() { email, reason }: RequestOTPDTO,
  ): Promise<{ message: string }> {
    return await this.authService.requestOTP({
      email,
      reason,
    });
  }

  // ========================================== Reset Password ==========================================

  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password has been successfully reset.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    schema: errorSchema(HttpStatus.BAD_REQUEST),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid OTP.',
    schema: errorSchema(HttpStatus.UNAUTHORIZED),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
    schema: errorSchema(HttpStatus.NOT_FOUND),
  })
  @ApiBody({ type: ForgotPasswordDTO })
  @Post('/reset-password')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() { email, otp, password }: ForgotPasswordDTO,
  ): Promise<{ message: string }> {
    return await this.authService.resetPassword({ email, otp, password });
  }
}
