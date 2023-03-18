const { check, validationResult } = require("express-validator")
const fs = require("fs")

const ValidateResult = async (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res.status(500).json({
                        res: "error server"
                    })
                }
                console.log('Archivo eliminado con éxito');
            });
        }
        return res.status(403).json({ res: err.array() })
    }
}

const validateCreateSignup = [
    check("nameUser")
        .exists()
        .isString()
        .isLength({ min: 4, max: 15 }),
    check("password")
        .exists()
        .isString()
        .isLength({ min: 8 }),
    check("fullName")
        .isString()
        .exists(),
    check("Email")
        .exists()
        .isString()
        .isEmail(),
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
module.exports = { validateCreateSignup }