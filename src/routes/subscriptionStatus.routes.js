const express = require("express")
const subscriptionStatus = require("../controllers/subscriptionStatusCtrll")
const Routes = express.Router()

Routes.get("/",subscriptionStatus)

module.exports = Routes