const dotenv = require("dotenv")
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    PRIVATEKEY: process.env.PRIVATEKEY,
    NODE_ENV: process.env.NODE_ENV,
    TEST: {
        MONGO_DB_URI_TEST: process.env.MONGO_DB_URI_TEST
    },
    TOKEN_ACCESS: {
        ACCESS_TOKEN_PRUEBA_SUBSCRIPTION: process.env.ACCESS_TOKEN_PRUEBA_SUBSCRIPTION
    },
    CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
}
module.exports = config