const express = require("express")
const searchServiceCtrll = require("../../controllers/ServiceUser/searchServiceCtrll")
const Router = express.Router()

Router.post("/",searchServiceCtrll)

module.exports = Router
