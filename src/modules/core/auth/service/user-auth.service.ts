// Nest JS
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

// entity imports
import { UserEntity } from 'src/modules/features/user/entities/user.entity';

// service imports
import { OtpService } from 'src/modules/features/otp/otp.service';
import { UserService } from 'src/modules/features/user/user.service';
import { JwtUserService } from '../../jwt/services/jwt-user.service';
import { JwtAdminService } from '../../jwt/services/jwt-admin.service';

// ENUMS, TYPES, INTERFACES and DTO imports
import { JWT } from 'src/types/common.type';
import { OTP_REASON_ENUM } from 'src/types/enums/otp/otp-reason.enum';
import { USER_ROLE_ENUM } from 'src/types/enums/user/user-role.enum';

// utils imports
import { throwHttpException } from 'src/utils/app/httpException';
import { comparePassword, hashPassword } from 'src/utils/hashing/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,

    private readonly jwtService: JwtUserService,

    private readonly jwtAdminService: JwtAdminService,

    private readonly otpService: OtpService,
  ) {}

  // TODO: ADD function description
  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userService.getUserFromDB({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // This is ignored because it is a starter template. In your application, you should check if the user is onboarded.
    // @ts-ignore
    if (!user.is_onboard) {
      throwHttpException('User not onboarded', HttpStatus.BAD_REQUEST);
    }

    // TODO: ADD user placed status check

    const passwordMatched = comparePassword(password, user.password);

    if (!passwordMatched) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.generateJWT(user);

    return { user, token };
  }

  // ======================================================= Register =======================================================
  /**
   * @description This method is used to register a new user by onboarding them and generating a JSON Web Token (JWT) for authentication.
   *
   * @param {Object} options - An object containing the necessary parameters for registering the user.
   * @param {string} options.email - The email address of the user.
   * @param {string} options.password - The password of the user.
   * @param {string} options.date_of_birth - The date of birth of the user.
   *
   * @returns {Promise<{ user: UserEntity; token: string; message: string }>} - Returns a Promise that resolves to an object containing the registered user entity, the generated JWT, and a success message.
   *
   * @throws {HttpException} - If the user is not found, already onboarded, or cannot be onboarded due to their current status.
   * @throws {Error} - If an error occurs during the onboarding or JWT generation process.
   *
   * @example
   * const response = await userRepository.register({
   *   email: 'user@example.com',
   *   password: 'password123',
   *   date_of_birth: '1990-01-01',
   * });
   * console.log(response.user, response.token, response.message);
   */
  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
    date_of_birth: string;
  }): Promise<{ user: UserEntity; token: string; message: string }> {
    const hashedPassword = hashPassword(password);

    const user = await this.userService.getUserFromDB({
      where: { email },
    });

    // ===================================== THIS IS A TEMPORARY BLOCK FOR STARTER TEMPLATE =====================================
    // PLEASE UPDATE THE CODE BELOW TO MATCH YOUR APPLICATION'S ONBOARDING PROCESS
    // Onboard: Register User

    // const {
    //   user: onboarded_user,
    //   status,
    //   message,
    // }: {
    //   user: UserEntity;
    //   status: HttpStatus;
    //   message: string;
    // } = await this.userService.onboardUser({
    //   user,
    //   date_of_birth,
    //   hashedPassword,
    // });

    const status: HttpStatus = HttpStatus.OK;
    // ===================================== THIS IS A TEMPORARY BLOCK FOR STARTER TEMPLATE =====================================
    if (status !== HttpStatus.OK) {
      throwHttpException(
        'User cannot onboard to YOUR PROJECT NAME',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = this.generateJWT({
      email: 'PASS THE GENERATED EMAIL FROM REGISTER API',
    } as Partial<UserEntity> as UserEntity);

    return {
      user: {
        email: 'USER COMING FROM THE REGISTER API',
      } as Partial<UserEntity> as UserEntity,
      token,
      message: 'This should be coming from this user registration service',
    };
  }

  // ======================================================= Request OTP =======================================================
  /**
   * @description This method is used to generate an OTP (One-Time Password) code and sends it to the user's email address.
   *
   * @param {Object} options - An object containing the necessary parameters for the password reset process.
   * @param {string} options.email - The email address of the user who has forgotten their password.
   * @param {OTP_REASON_ENUM} options.reason - The reason for requesting the OTP code.
   *
   * @returns {Promise<{ message: string }>} - Returns a Promise that resolves to an object containing a success message.
   *
   * @throws {UnauthorizedException} - If the user with the provided email address is not found.
   * @throws {Error} - If an error occurs during the OTP generation or email sending process.
   *
   * @example
   * const response = await userRepository.forgotPassword({ email: 'user@example.com' });
   * console.log(response.message);
   */
  async requestOTP({
    email,
    reason,
  }: {
    email: string;
    reason: OTP_REASON_ENUM;
  }): Promise<{ message: string }> {
    const user = await this.userService.getUserFromDB({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.otpService.generateOTPCode({
      email,
      reason,
    });

    return {
      message: 'OTP sent to your email',
    };
  }

  // ======================================================= Reset Password =======================================================
  /**
   * @description This method is used to reset a user's password after verifying the provided OTP (One-Time Password) code.
   *
   * @param {Object} options - An object containing the necessary parameters for resetting the password.
   * @param {string} options.email - The email address of the user resetting their password.
   * @param {string} options.otp - The OTP code entered by the user.
   * @param {string} options.password - The new password chosen by the user.
   *
   * @returns {Promise<{ message: string }>} - Returns a Promise that resolves to an object containing a success message.
   *
   * @throws {UnauthorizedException} - If the user with the provided email address is not found.
   * @throws {HttpException} - If the provided OTP code is invalid or has expired.
   * @throws {Error} - If an error occurs during the password reset process.
   *
   * @example
   * const response = await userRepository.resetPassword({
   *   email: 'user@example.com',
   *   otp: '123456',
   *   password: 'newPassword123',
   * });
   * console.log(response.message);
   */
  async resetPassword({
    email,
    otp,
    password,
  }: {
    email: string;
    otp: number;
    password: string;
  }): Promise<{ message: string }> {
    const user = await this.userService.getUserFromDB({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { message, status } = await this.otpService.verifyOTPCode({
      email,
      otp,
    });

    if (status !== HttpStatus.OK) {
      throwHttpException(message, status);
    }

    const hashedPassword = hashPassword(password);

    await this.userService.updateUser({
      where: { email },
      data: { password: hashedPassword },
    });

    return {
      message: 'Password has been successfully reset.',
    };
  }

  // ======================================================= GENERATE JWT =======================================================
  /**
   * @description This method generates a JSON Web Token (JWT) for a given user entity based on their role.
   *
   * @param {UserEntity} user - The user entity for which the JWT should be generated.
   *
   * @returns {string} - Returns the generated JWT.
   *
   * @throws {Error} - If an error occurs during the JWT generation process.
   *
   * @example
   * const token = await userRepository.generateJWT(user);
   * console.log(token);
   */
  generateJWT(user: UserEntity): string {
    const payload: JWT = {
      id: user.id,
      email: user.email,
    };

    // This is ignored because it is a starter template. In your application, you should check the user's role.
    // @ts-ignore
    switch (user.role.name) {
      case USER_ROLE_ENUM.USER:
        Logger.log('Generating user JWT');
        return this.jwtService.generateAuthToken({ payload });

      case USER_ROLE_ENUM.ADMIN:
        Logger.log('Generating admin JWT');
        return this.jwtAdminService.generateAuthToken({ payload });

      default:
        break;
    }
  }
}
