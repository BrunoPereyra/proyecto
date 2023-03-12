const express = require("express")
const serviceSoldCreateCtrllBasic = require("../controllers/ServiceUser/serviceSoldCreateBasicCtrll")
const Router = express.Router()

Router.post("/",serviceSoldCreateCtrllBasic)

module.exports = Router