import { registerAs } from '@nestjs/config';

export default registerAs('smtp', () => ({
  email: process.env.SMTP_EMAIL,
  password: process.env.SMTP_PASSWORD,
}));
