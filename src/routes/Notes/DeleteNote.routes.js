const express = require("express")
const Router = express.Router()
const deleteNotesManage = require("../../controllers/notes/deleteNotesManagecrtll")

Router.post("/", deleteNotesManage)

module.exports = Router