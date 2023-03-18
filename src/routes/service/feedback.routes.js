const express = require("express")
const feedbackCtrll = require("../../controllers/ServiceUser/feedbackcCtrll")
const Router = express.Router()
 
Router.post("/",feedbackCtrll)

module.exports = Router