const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")


const validatorDeleteNote = [
    check("idNote")
        .exists()
        .isMongoId(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
module.exports = { validatorDeleteNote }