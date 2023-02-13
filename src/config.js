const dotenv = require("dotenv")
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    privatekey: process.env.privatekey,
    NODE_ENV: process.env.NODE_ENV,
    TEST: {
        MONGO_DB_URI_TEST: process.env.MONGO_DB_URI_TEST
    }
}
module.exports = config