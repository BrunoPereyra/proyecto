const express = require("express")
const SubscriptionCreate = require("../controllers/subscriptionCreateCtrll")
const Routes = express.Router()

Routes.post("/", SubscriptionCreate)

module.exports = Routes