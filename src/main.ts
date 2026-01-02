import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get Config Service
  const configService = app.get(ConfigService);

  // Add Mikro ORM
  await MikroORM.init({
    driver: PostgreSqlDriver,
    dbName: configService.get<string>('POSTGRES_DB'),
    user: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    host: configService.get<string>('POSTGRES_HOST'),
    port: Number(configService.get<number>('POSTGRES_PORT')),
    debug: configService.get<string>('NODE_ENV') !== 'production',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    driverOptions: {
      connection: {
        ssl: {
          rejectUnauthorized: true,
          ca: fs
            .readFileSync(join(__dirname, '..', process.env.DB_SSL_CA!))
            .toString(),
        },
      },
    },
  });

  // Add Swagger
  const config = new DocumentBuilder()
    .setTitle('New Blog API')
    .setDescription('API description for New Blog')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
