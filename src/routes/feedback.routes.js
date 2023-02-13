const express = require("express")
const feedbackCtrll = require("../controllers/feedbackcCtrll")
const Router = express.Router()
 
Router.post("/",feedbackCtrll)

module.exports = Router