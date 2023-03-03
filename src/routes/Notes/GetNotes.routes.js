const express = require("express")
const Router = express.Router()
const GetNotes = require("../../controllers/notes/getNotes.ctrll")

Router.get("/", GetNotes)

module.exports = Router