const express = require("express")
const loginCtrll = require("../controllers/loginCtrll")
const Routes = express.Router()

Routes.post("/",loginCtrll)

module.exports = Routes