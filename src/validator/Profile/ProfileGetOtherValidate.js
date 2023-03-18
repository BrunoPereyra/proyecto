const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const validateCreateProfileGetOther = [
    check("idUserProfile")
    .exists()
    .isMongoId(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
module.exports = { validateCreateProfileGetOther }