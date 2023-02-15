require("./db")
const express = require("express")
const app = express()
const config = require("./config")
const cors = require("cors")
const morgan = require("morgan")

const { validateCreateSignup } = require("./validator/signup")
const { validateCreateLogin } = require("./validator/login")
const { validateCreateServiceSold } = require("./validator/serviceSoldCreate")
const { validateFeedback } = require("./validator/feedback")
const { validateSearchService } = require("./validator/searchService")

const notFound = require("./middleware/notFound")
const handleError = require("./middleware/handleErrors")
const useExtractor = require("./middleware/useExtractor")


app.use(express.json())
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(morgan("dev"))

app.use("/signup", validateCreateSignup, require("./routes/signup.routes"))
app.use("/login", validateCreateLogin, require("./routes/login.routes"))
app.use("/createService", validateCreateServiceSold, useExtractor, require("./routes/ServicesSoldcreate.routes"))
app.use("/feedbackService", validateFeedback, useExtractor, require("./routes/feedback.routes"))
app.use("/services", validateSearchService, useExtractor, require("./routes/searchService.routes"))


app.use(handleError)
app.use(notFound)
const server = app.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`)
})

module.exports = { app, server }