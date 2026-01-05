import { defineConfig } from '@mikro-orm/postgresql';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import * as fs from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  extensions: [Migrator],
  driver: PostgreSqlDriver,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),

  debug: process.env.NODE_ENV !== 'production',

  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],

  driverOptions: {
    connection: {
      ssl: process.env.DB_SSL_CA
        ? {
            rejectUnauthorized: true,
            ca: fs
              .readFileSync(join(process.cwd(), 'certs', process.env.DB_SSL_CA))
              .toString(),
          }
        : undefined,
    },
  },

  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
  },
});
