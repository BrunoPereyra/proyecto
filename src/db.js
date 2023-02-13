const mongoose = require("mongoose")
const { NODE_ENV, TEST, MONGO_DB_URI } = require("./config")

const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}
mongoose.set("strictQuery", false);
const connectionString = NODE_ENV == "test"
    ? TEST.MONGO_DB_URI_TEST
    : MONGO_DB_URI


mongoose.connect(connectionString,mongooseOpts)
    .then(() => console.log("db on"))
    .catch(error => console.log(error))