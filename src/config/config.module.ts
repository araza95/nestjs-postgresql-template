// NestJS Common Imports
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

// Loaders
import databaseConfig from './loaders/database.config';
import appConfig from './loaders/app.config';
import smtpConfig from './loaders/smtp.config';

// Validation
import { validationSchema } from './schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [
        // appConfig, databaseConfig, smtpConfig
      ],
      validate: validationSchema.parse,
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
