const { check } = require("express-validator")

const { validateResult } = require("../../helpers/validateHelper")

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
    check('time_unit')
        .exists()
        .isString(),
    check('time_magnitud')
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
        check().custom((value, { req }) => {
            if (!req.file.fieldname) {
              throw new Error("Image is required");
            } else if (!req.file.mimetype.startsWith("image/")) {
              throw new Error("Invalid image format");
            } else {
              return true;
            }
          }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
module.exports = { validateCreateServiceSold }