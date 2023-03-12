const { check } = require("express-validator")
const { validationResult } = require("express-validator")
const fs = require("fs")


const ValidateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                return res.status(500).json({
                    res: "error server"
                })
            }
            console.log('Archivo eliminado con éxito');
        });
        return res.status(403).json({ res: err.array() })
    }
}

const validateCreateServiceSoldBasic = [
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
        ValidateResult(req, res, next)
    }
]
module.exports = { validateCreateServiceSoldBasic }