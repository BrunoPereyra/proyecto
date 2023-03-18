const express = require("express")
const ProfileGetOther = require("../../controllers/profiles/ProfileGetOther")
const Router = express.Router()

Router.post("/",ProfileGetOther)

module.exports = Router