const express = require("express")
const Router = express.Router()
const ProfileGet = require("../controllers/ProfileGetCtrll")

Router.get("/", ProfileGet)

module.exports = Router