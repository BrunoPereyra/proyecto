const express = require("express")
const suscripcionCreateCtrll = require("../controllers/suscripcionCreateCtrll")
const Routes = express.Router()

Routes.post("/",suscripcionCreateCtrll)

module.exports = Routes