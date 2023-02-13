const express = require("express")
const searchServiceCtrll = require("../controllers/searchServiceCtrll")
const Router = express.Router()

Router.get("/",searchServiceCtrll)

module.exports = Router
