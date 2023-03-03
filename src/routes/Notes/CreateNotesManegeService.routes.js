const express = require("express")
const Router = express.Router()
const CreateNotesManageServicectrll = require("../../controllers/notes/CreateNotesManageServicectrll")

Router.post("/", CreateNotesManageServicectrll)

module.exports = Router