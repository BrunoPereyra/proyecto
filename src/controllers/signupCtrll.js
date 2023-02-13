const Users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { privatekey } = require("../config")


const SignupCtrll = async (req, ress) => {
    const { nameUser, password, fullName, Email } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new Users({
        nameUser,
        passwordHash,
        fullName,
        Email,
        date: new Date()
    })

    const userRepeat = await Users.findOne({ nameUser: nameUser });
    const EmailRepeat = await Users.findOne({ Email: Email });

    if (userRepeat) {
        return ress.status(203).json({
            ress: "userRepeat",
        });
    } else if (EmailRepeat) {
        return ress.status(203).json({
            ress: "EmailRepeat",
        });
    } else {
        const userSave = await user.save();
        var passwordCompare = bcrypt.compare(password, userSave.passwordHash)
        if (passwordCompare) {
            const dataToken = {
                id: userSave.id,
                fullName: userSave.fullName
            }
            const token = jwt.sign(dataToken, privatekey)
            return ress.status(201).json({
                ress: {
                    token,
                    nameUser: user.nameUser
                }
            })
        } else {
            return ress.status(401).json({
                ress: "error server"
            })
        }
    }
}


module.exports = SignupCtrll