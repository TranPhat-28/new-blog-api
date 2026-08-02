import { defineConfig } from '@mikro-orm/postgresql';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import * as fs from 'fs';
import { join } from 'path';
import { SeedManager } from '@mikro-orm/seeder';
import { env } from './src/config/env';

export default defineConfig({
    extensions: [Migrator, SeedManager],
    driver: PostgreSqlDriver,
    dbName: env.postgres.database,
    user: env.postgres.user,
    password: env.postgres.password,
    host: env.postgres.host,
    port: env.postgres.port,

    debug: env.app.nodeEnv !== 'production',

    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],

    seeder: {
        path: 'dist/database/seeders',
        pathTs: 'src/database/seeders',
    },

    driverOptions: {
        connection: {
            ssl: env.postgres.cert
                ? {
                      rejectUnauthorized: true,
                      ca: (() => {
                          // Local development
                          const localPath = join(
                              process.cwd(),
                              'certs',
                              env.postgres.cert,
                          );

                          // Staging on Render
                          const stagingPath = join(
                              '/etc/secrets',
                              env.postgres.cert,
                          );

                          const certPath = fs.existsSync(localPath)
                              ? localPath
                              : stagingPath;

                          return fs.readFileSync(certPath).toString();
                      })(),
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
