const { check } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateCreateSignup = [
    check("nameUser")
        .exists()
        .isString()
        .isLength({ min: 4, max: 15 }),
    check("password")
        .exists()
        .isString()
        .isLength({ min: 8 }),
    check("fullName")
        .isString()
        .exists(),
    check("Email")
        .exists()
        .isString()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
module.exports = { validateCreateSignup }