import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    API_PREFIX: process.env.API_PREFIX || '/api',
    APP_KEY: process.env.APP_KEY,
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    SECRET: process.env.SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    HOST_URL: process.env.HOST_URL,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_AUTH_USERNAME: process.env.EMAIL_AUTH_USERNAME,
    EMAIL_AUTH_PASSWORD: process.env.EMAIL_AUTH_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_BUCKET_URL: process.env.S3_BUCKET_URL,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    SECURE_IV: process.env.SECURE_IV,
    SECURE_KEY: process.env.SECURE_KEY,
    EMAIL_SERVER_URL: process.env.EMAIL_SERVER_URL,
};
