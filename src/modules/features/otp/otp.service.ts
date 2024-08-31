// NestJS
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { OTPTableEntity } from './entity/otp.entity';
import { UserEntity } from '../user/entities/user.entity';

// Services
import { UserService } from '../user/user.service';

// Utils
import { generateOTP, NUMERICAL_OTP } from 'src/utils/app/otp';

// Enums
import { OTP_REASON_ENUM } from 'src/types/enums/otp/otp-reason.enum';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OTPTableEntity)
    private readonly otpRepository: Repository<OTPTableEntity>,

    private readonly userService: UserService,
  ) {}

  // ======================================================= GENERATE OTP CODE =======================================================
  /**
   * @description This method generates a new OTP (One-Time Password) code for the given email address and reason.
   *
   * @param {Object} options - An object containing the necessary parameters for generating the OTP code.
   * @param {string} options.email - The email address associated with the OTP code.
   * @param {OTP_REASON_ENUM} options.reason - The reason for generating the OTP code.
   *
   * @returns {Promise<number>} - Returns a Promise that resolves to the generated OTP code.
   *
   * @throws {UnauthorizedException} - If the user with the provided email address is not found.
   * @throws {Error} - If an error occurs during the OTP generation or database operation.
   *
   * @example
   * const otpCode = await otpRepository.generateOTPCode({
   *   email: 'user@example.com',
   *   reason: OTP_REASON_ENUM.FORGOT_PASSWORD,
   * });
   * console.log(otpCode);
   */
  async generateOTPCode({
    email,
    reason,
  }: {
    email: string;
    reason: OTP_REASON_ENUM;
  }): Promise<number> {
    const { id } = await this.userService.getUserFromDB({ where: { email } });

    if (!id) {
      throw new UnauthorizedException('User not found');
    }

    // Find all OTP requested by the user
    const otp_requested_by_user = await this.otpRepository.find({
      where: { user: { id }, type: reason },
    });

    // delete previous OTPs requested by the user
    await this.otpRepository.remove(otp_requested_by_user);

    // Generate a new OTP code
    const code: number | string = generateOTP({
      length: 6,
      options: NUMERICAL_OTP,
    }) as number;

    await this.create({
      email,
      otp: code,
      is_used: false,
      is_expired: false,
      type: reason,
      user: { id } as UserEntity,
    });

    return code;
  }

  //  ======================================================= CREATE OTP RECORD =======================================================
  /**
   * @description This method is used to create a new OTP entry in the database.
   * After 5 minutes, the OTP entry is marked as expired.
   *
   * @param {OTPTableEntity} data - The data for the OTP entry to be created
   *
   * @returns {Promise<OTPTableEntity>} - Returns the newly created OTP entry
   *
   * @example create({ email: 'alihaiderizvi.you@gmail.com', otp: '123456', type: 'FORGOT_PASSWORD' })
   */
  async create(data: Partial<OTPTableEntity>): Promise<OTPTableEntity> {
    // Calculate the expiry time 5 minutes from now
    const expiry = new Date();

    expiry.setMinutes(expiry.getMinutes() + 5);

    // Set the expiry time in the data
    data.expires_at = expiry;

    // Save the OTP entry in the database
    return this.otpRepository.save(data);
  }

  // ======================================================= VERIFY OTP CODE =======================================================
  /**
   * @description This method verifies the provided OTP (One-Time Password) code for the given email address.
   *
   * @param {Object} options - An object containing the necessary parameters for verifying the OTP code.
   * @param {number} options.otp - The OTP code entered by the user.
   * @param {string} options.email - The email address associated with the OTP code.
   *
   * @returns {Promise<{ status: HttpStatus; message: string }>} - Returns a Promise that resolves to an object containing the HTTP status and a success or error message.
   *
   * @throws {UnauthorizedException} - If the OTP code is invalid, has expired, or has already been used.
   * @throws {Error} - If an error occurs during the OTP verification process.
   *
   * @example
   * const response = await userRepository.verifyOTPCode({ otp: '123456', email: 'user@example.com' });
   * console.log(response.status, response.message);
   */
  async verifyOTPCode({
    otp,
    email,
  }: {
    otp: number;
    email: string;
  }): Promise<{ status: HttpStatus; message: string }> {
    const otp_record = await this.otpRepository.findOne({
      where: { otp, email },
    });

    if (!otp_record) {
      throw new UnauthorizedException('Invalid OTP');
    }

    if (otp_record.is_expired) {
      throw new UnauthorizedException('OTP has expired');
    }

    if (otp_record.is_used) {
      throw new UnauthorizedException('OTP has already been used');
    }

    // Check if the OTP entry is expired
    const currentTime = new Date().getTime();

    const expiry_date = new Date(otp_record.expires_at).getTime();

    if (expiry_date < currentTime) {
      this.otpRepository.update(
        { email, otp },
        { is_expired: true, is_used: true },
      );
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'OTP code has expired',
      };
    }

    this.otpRepository.update({ email, otp }, { is_used: true });

    // If the OTP entry is found and not used or expired, return status and message
    return { status: HttpStatus.OK, message: 'OTP code is valid' };
  }
}
