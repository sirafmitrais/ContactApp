require('dotenv').config();

module.exports = {
    "PORT": process.env.PORT || 3000,
    "APPENDPOINT": "http://localhost:8000",
    "APIENDPOINT": "http://localhost:8000",
    "JWT_SECRET": process.env.SECRET_KEY,
    "JWT_EXP": process.env.TOKEN_EXPIRY,
    "ENV": "dev",
    "MONGO": {
        "USER": process.env.MONGO_USER,
        "HOST": process.env.MONGO_HOST,
        "PASSWORD": process.env.MONGO_PASSWORD,
        "DB":process.env.MONGO_DB,
    }
}