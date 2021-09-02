require('dotenv').config();

const configApp = {
    PORT: process.env.PORT || 3000,
    APPENDPOINT: process.env.APPENDPOINT || "http://localhost:8000",
    APIENDPOINT: process.env.APPENDPOINT || "http://localhost:8000",
    JWT_SECRET: process.env.SECRET_KEY || "secret123",
    JWT_EXP: process.env.TOKEN_EXPIRY,
    ENV: process.env.ENV,
    MONGO: {
        USER: process.env.MONGO_USER,
        HOST: process.env.MONGO_HOST,
        PASSWORD: process.env.MONGO_PASSWORD,
        DB: process.env.MONGO_DB
    },
    REDIS: {
        HOST: process.env.REDIS_HOST_REMOTE || "localhost",
        PORT: process.env.REDIS_PORT_REMOTE || 6379,
        PASSWORD: process.env.REDIS_PASSWORD || ""
    },
    MAGIC_KEYWORD: process.env.MAGIC_KEYWORD
}

export {
    configApp
}