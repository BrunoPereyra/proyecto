const express = require("express")
const serviceSoldCreateCtrll = require("../controllers/serviceSoldCreateCtrll")
const Router = express.Router()

Router.post("/",serviceSoldCreateCtrll)

module.exports = Router