const express = require("express")
const SubscriptionCreate = require("../../controllers/subscription/subscriptionCreateCtrll")
const Routes = express.Router()

Routes.post("/", SubscriptionCreate)

module.exports = Routes