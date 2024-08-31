// Nest JS
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

// Utils
import { getSSLType } from 'src/utils/app/get-ssl-type';

// Modules
import { CustomConfigModule } from '../config.module';
// import { QueryLogger } from 'src/middlewares/query-logger.middleware';

export class TypeORMConfig {
  static getPostgreSQLConfig(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('postgres.host'),
      port: configService.get('postgres.port'),
      username: configService.get('postgres.user'),
      password: configService.get('postgres.password'),
      database: configService.get('postgres.database'),
      synchronize: true,
      autoLoadEntities: true,
      ssl: getSSLType(configService.get('postgres.ssl')),
      // logger: new QueryLogger(),
    };
  }
}

export const PostgreSQLConfig: TypeOrmModuleAsyncOptions = {
  imports: [CustomConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleAsyncOptions> =>
    TypeORMConfig.getPostgreSQLConfig(configService),
  inject: [ConfigService],
};
