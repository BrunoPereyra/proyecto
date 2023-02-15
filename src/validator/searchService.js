const { check } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const validateSearchService = [
    check("refService")
        .exists()
        .isString(),
    check("id")
        .exists()
        .isMongoId()
        .optional(),
    check("filter")
        .isArray()
        .isLength({ min: 2 })
        .optional(),
    check("filter[0]")
        .isBoolean()
        .optional(),
    check("filter[1]")
        .isBoolean()
        .optional(),

    (req, res, next) => {
        validateResult(req, res, next)
    }


]
module.exports = { validateSearchService }