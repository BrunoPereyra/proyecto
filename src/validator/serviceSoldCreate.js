const { check } = require("express-validator")

const { validateResult } = require("../helpers/validateHelper")

const validateCreateServiceSold = [
    check("nameService")
        .exists()
        .isString()
        .isLength({ min: 2, max: 35 }),
    check("description")
        .exists()
        .isString()
        .isLength({ min: 5, max: 215 }),
    check("zone")
        .exists()
        .isString(),
    check("price")
        .exists()
        .isString(),
        
    check("time").isArray(),
    check('time.*.unit')
        .exists()
        .isString(),
    check('time.*.magnitud')
        .exists()
        .isString()
        .custom((value, { req }) => {
            if (value == "/d") {
                return true
            } else if (value == "/h") {
                return true
            } else {
                return false
            }
        }),

    // check('labels').isArray(),
    // check('labels').isLength(4),
    // check("labels.*").isString(),
    // check("labels.*").isLength({ min: 1, max: 23 }),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]
module.exports = { validateCreateServiceSold }