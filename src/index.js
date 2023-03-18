require("./db")
const express = require("express")
const app = express()
const config = require("./config")
const cors = require("cors")
const morgan = require("morgan")

const http = require("http")
const socket = require("./socket")

const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})

const { validateCreateSignup } = require("./validator/signup")
const { validateCreateLogin } = require("./validator/login")
const { validateCreateServiceSoldBasic } = require("./validator/ServiceUser/serviceSoldCreatebasic")
const { validateFeedback } = require("./validator/ServiceUser/feedback")
const { validateSearchService } = require("./validator/ServiceUser/searchService")
const { validatorCreateNoteManageService } = require("./validator/notes/createNoteManageService")
const { validatorDeleteNote } = require("./validator/notes/deleteNoteManage")
const { validateCreateProfileGetOther } = require("./validator/Profile/ProfileGetOtherValidate")


const notFound = require("./middleware/notFound")
const handleError = require("./middleware/handleErrors")
const useExtractor = require("./middleware/useExtractor")

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(express.json())
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(morgan("dev"))

app.use("/signup", upload.single("avatar"), validateCreateSignup, require("./routes/signup.routes"))
app.use("/login", validateCreateLogin, require("./routes/login.routes"))

app.use("/createServiceBasic", upload.single("image"), validateCreateServiceSoldBasic, useExtractor, require("./routes/service/ServicesSoldcreate.routes"))
app.use("/services", validateSearchService, useExtractor, require("./routes/service/searchService.routes"))
app.use("/feedbackService", validateFeedback, useExtractor, require("./routes/service/feedback.routes"))

app.use("/subscription", useExtractor, require("./routes/subscription/subscriptionCreate.routes"))
app.use("/subscriptionStatus", useExtractor, require("./routes/subscription/subscriptionStatus.routes"))

app.use("/createNotes", validatorCreateNoteManageService, useExtractor, require("./routes/Notes/CreateNotesManegeService.routes"))
app.use("/deleteNotes", validatorDeleteNote, useExtractor, require("./routes/Notes/DeleteNote.routes"))
app.use("/GetNotes", useExtractor, require("./routes/Notes/GetNotes.routes"))

app.use("/ProfileGet", useExtractor, require("./routes/profile/ProfileGet.routes"))
app.use("/ProfileGetOther", validateCreateProfileGetOther, useExtractor, require("./routes/profile/ProfileGetOther.routes"))

const Message = require("./models/message")
app.get('/api/messages', useExtractor, async (req, res) => {

  const { idUser } = req
  const recipientId = req.query.recipientId;
  console.log(idUser, recipientId);
  const messages = await Message.find({ sender: idUser, recipient: recipientId });

  res.json(messages);
});


app.use(handleError)
app.use(notFound)
server.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`)
})
socket(io)
module.exports = { app, server }