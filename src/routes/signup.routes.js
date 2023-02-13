const express = require("express")
const Router = express.Router()
const SignupCtrll = require("../controllers/signupCtrll")

Router.post("/",SignupCtrll)

module.exports = Router