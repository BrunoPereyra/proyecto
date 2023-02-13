const { check } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateLogin = [
    check("nameUser")
        .exists()
        .isString()
        .isLength({ min: 4, max: 15 }),
    check("password")
        .exists()
        .isString()
        .isLength({ min: 8 }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
module.exports = { validateCreateLogin }