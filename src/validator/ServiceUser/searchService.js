const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const validateSearchService = [
    check("refService")
        .exists()
        .isString()
        .optional(),
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
    
     check().custom((value, { req }) => {
        if (!req.query.refService && !req.query.id ) {
            throw new Error('Debe enviar al menos uno de los params');
        }
        return true;
    }),

    (req, res, next) => {
        validateResult(req, res, next)
    }


]
module.exports = { validateSearchService }