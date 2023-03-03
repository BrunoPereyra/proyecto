const express = require("express")
const serviceSoldCreateCtrll = require("../controllers/ServiceUser/serviceSoldCreateCtrll")
const Router = express.Router()

Router.post("/",serviceSoldCreateCtrll)

module.exports = Router