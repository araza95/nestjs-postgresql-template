// Nest Js Imports
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

// Module Imports
import { AppModule } from './app.module';

// Swagger Imports
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

// Request IP Import
import * as requestIp from 'request-ip';

async function bootstrap() {
  // Raw Body is used to get the raw body of the request, which is useful for parsing the request body.
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const port: number = 6000;

  await app.listen(3000);

  Logger.log('App is bootstrapping...', 'Bootstrap');

  app.use(requestIp.mw());

  // TODO: Update this to only allow the front-end URL
  app.enableCors({
    origin: ['http://localhost:3000', 'https://YOUR_FRONT_END_URL_HERE.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  const config = new DocumentBuilder()
    .setTitle('YOUR-BACKEND-NAME APIs')
    .setDescription(
      'YOUR-BACKEND-NAME back-end application written in NestJS using PostgreSQL and TypeORM.',
    )
    .setVersion('1.0.0')
    .addTag('YOUR-BACKEND-NAME')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Bearer Authorization',
    )
    .build();

  const theme = new SwaggerTheme();

  const themeOptions = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  await ConfigModule.envVariablesLoaded;

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, themeOptions);

  await app.listen(port);

  Logger.log(`🚀 Server is up and running on port ${port}`, 'Bootstrap');
}

bootstrap();