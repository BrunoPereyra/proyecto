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
        .custom((value) => {
            if (!(parseInt(value) === value)) return false
            if (!(value <= 5)) return false;
            if (!(value >= 1)) return false;
            return true
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { validateFeedback }