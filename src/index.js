require("./db")
const express = require("express")
const app = express()
const config = require("./config")
const cors = require("cors")
const morgan = require("morgan")

const { validateCreateSignup } = require("./validator/signup")
const { validateCreateLogin } = require("./validator/login")
const { validateCreateServiceSold } = require("./validator/ServiceUser/serviceSoldCreate")
const { validateFeedback } = require("./validator/ServiceUser/feedback")
const { validateSearchService } = require("./validator/ServiceUser/searchService")
const { validatorCreateNoteManageService } = require("./validator/notes/createNoteManageService")
const { validatorDeleteNote } = require("./validator/notes/deleteNoteManage")


const notFound = require("./middleware/notFound")
const handleError = require("./middleware/handleErrors")
const useExtractor = require("./middleware/useExtractor")

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

app.use(express.json())
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(morgan("dev"))

app.use("/signup", validateCreateSignup, require("./routes/signup.routes"))
app.use("/login", validateCreateLogin, require("./routes/login.routes"))
app.use("/createService", upload.single("image"), validateCreateServiceSold, useExtractor, require("./routes/ServicesSoldcreate.routes"))
app.use("/feedbackService", validateFeedback, useExtractor, require("./routes/feedback.routes"))
app.use("/services", validateSearchService, useExtractor, require("./routes/searchService.routes"))
app.use("/subscription", useExtractor, require("./routes/subscriptionCreate.routes"))
app.use("/subscriptionStatus", useExtractor, require("./routes/subscriptionStatus.routes"))
app.use("/createNotes", validatorCreateNoteManageService, useExtractor, require("./routes/Notes/CreateNotesManegeService.routes"))
app.use("/deleteNotes", validatorDeleteNote, useExtractor, require("./routes/Notes/DeleteNote.routes"))
app.use("/GetNotes", useExtractor, require("./routes/Notes/GetNotes.routes"))
app.use("/ProfileGet", useExtractor, require("./routes/ProfileGet.routes"))


app.use(handleError)
app.use(notFound)
const server = app.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`)
})

module.exports = { app, server }