const Users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PRIVATEKEY } = require("../config")
const { cloudinary } = require("../helpers/cloudinary")

const fs = require("fs")


const SignupCtrll = async (req, res) => {
    const { nameUser, password, fullName, Email } = req.body

    const userRepeat = await Users.findOne({ nameUser: nameUser });
    const EmailRepeat = await Users.findOne({ Email: Email });

    if (userRepeat) {
        return res.status(406).json({
            res: "userRepeat",
        });
    } else if (EmailRepeat) {
        return res.status(406).json({
            res: "EmailRepeat",
        });
    } else {
        const passwordHash = await bcrypt.hash(password, 10)
        const cloudinaryResult = await cloudinary.uploader.upload(req.file.path)

        const user = new Users({
            nameUser,
            passwordHash,
            fullName,
            Email,
            avatar: {
                url: cloudinaryResult.url,
                public_id: cloudinaryResult.public_id
            },
            date: new Date()
        })
        fs.unlink(req.file.path, (err) => {
            if (err) {
                return res.status(500).json({
                    res: "error server"
                })
            }
            console.log('Archivo eliminado con éxito');
        });

        const userSave = await user.save();
        var passwordCompare = bcrypt.compare(password, userSave.passwordHash)
        if (passwordCompare) {
            const dataToken = {
                id: userSave.id,
                fullName: userSave.fullName
            }
            const token = jwt.sign(dataToken, PRIVATEKEY)
            return res.status(201).json({
                res: {
                    token,
                    nameUser: user.nameUser
                }
            })
        } else {
            return rss.status(401).json({
                res: "error server"
            })
        }
    }
}


module.exports = SignupCtrll