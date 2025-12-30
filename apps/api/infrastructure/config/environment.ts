import dotenv from 'dotenv'

dotenv.config();

export const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    },
    cors: {
        origin: process.env.CORS_ORIGIN
    }
}