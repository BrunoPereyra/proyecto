const express = require("express")
const suscripcionStatus = require("../controllers/suscripcionStatusCtrll")
const Routes = express.Router()

Routes.get("/",suscripcionStatus)

module.exports = Routes