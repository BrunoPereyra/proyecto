const { check } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateFeedback = [
    check("coment")
        .exists()
        .isString()
        .isLength({ max: 200 }),
    check("ServicesSoldUserId")
        .exists()
        .isMongoId(),
    check("userByServiceId")
        .exists()
        .isMongoId(),
    check("stars")
        .exists()
        .isInt()
        .custom((value, { req }) => {
            if (value >= 0 && value <= 5) {
                return true
            } else {
                return false
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { validateFeedback }