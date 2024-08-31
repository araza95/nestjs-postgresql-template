import { z } from 'nestjs-zod/z';

/**
 * @description This is the schema for the .env file. 
 * And this will check if the .env file has the correct keys and values.
 * 
 * Comment out those lines if you don't want to use the .env file.
 * For example: Initially, you don't have the AWS keys, so you can comment out the AWS keys.
 */
export const validationSchema = z.object({
  // APP

  TZ: z.string().default('UTC'),
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(4000),

  // DATABASE
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_USER: z.string().default('root'),
  POSTGRES_PASSWORD: z.string().default('zenkoders'),
  POSTGRES_DATABASE: z.string().default('tribal'),
  POSTGRES_SSL: z.string().default('false'),

  // JWT
  USER_SECRET_KEY: z.string().default('user_secret'),
  USER_EXPIRES_IN: z.string().default('1d'),
  ADMIN_SECRET_KEY: z.string().default('admin_secret'),
  ADMIN_EXPIRES_IN: z.string().default('1d'),

  // OTP
  OTP_SECRET_KEY: z.string().default('otp_secret'),
  OTP_EXPIRES_IN: z.string().default('1d'),

  // MAIL
  SMTP_EMAIL: z.string(),
  SMTP_PASSWORD: z.string(),

  // AWS
  AWS_BUCKET_NAME: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
});

export type Config = z.infer<typeof validationSchema>;
