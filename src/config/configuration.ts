import dotenv from 'dotenv';

export const loadEnvironmentForMikroORMConfig = () => {
    dotenv.config();

    const required = [
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DB',
        'APP_JWT_SECRET',
        'APP_JWT_EXPIRES_IN',
    ];

    for (const name of required) {
        if (!process.env[name]) {
            throw new Error(`Missing required environment variable: ${name}`);
        }
    }

    console.log(`Running in ${process.env.NODE_ENV} environment`);
};
