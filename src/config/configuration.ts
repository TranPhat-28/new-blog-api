import { env } from './env';

export default () => ({
    app: env.app,
    jwt: env.jwt,
    postgres: env.postgres,
});
