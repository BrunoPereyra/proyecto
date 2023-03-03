const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")


const validatorCreateNoteManageService = [
    check("title")
        .exists()
        .isString()
        .isLength({ max: 20 }),
    check("description")
        .exists()
        .isString()
        .isLength({ max: 200 }),
    (req, res, next) => {
        validateResult(req, res, next)

    }
]
module.exports = { validatorCreateNoteManageService }