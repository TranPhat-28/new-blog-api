import dotenv from 'dotenv';

dotenv.config();

function required(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    app: {
        port: Number(process.env.PORT ?? 3000),
        nodeEnv: process.env.NODE_ENV ?? 'development',
    },

    jwt: {
        secret: required('APP_JWT_SECRET'),
        expiresIn: required('APP_JWT_EXPIRES_IN'),
    },
    postgres: {
        host: required('POSTGRES_HOST'),
        port: Number(required('POSTGRES_PORT')),
        database: required('POSTGRES_DB'),
        user: required('POSTGRES_USER'),
        password: required('POSTGRES_PASSWORD'),
        cert: required('DB_SSL_CA'),
    },
} as const;
