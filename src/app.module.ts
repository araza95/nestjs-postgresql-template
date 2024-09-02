// Nest JS Imports
import { Module } from '@nestjs/common';

// Controller Imports
import { AppController } from './app.controller';

// Service Imports
import { AppService } from './app.service';

// Module Imports
import { CustomConfigModule } from './config/config.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { MailModule } from './modules/core/mail/mail.module';
import { JwtModule } from './modules/core/jwt/jwt.module';

@Module({
  imports: [
    /** Config Module Import */
    CustomConfigModule,
    AuthModule,
    MailModule,
    JwtModule,

    // OPEN THIS WHEN YOU HAVE YOUR DATABASE CONFIGURED
    //  TypeOrmModule.forRootAsync(PostgreSQLConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
