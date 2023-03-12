const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PRIVATEKEY } = require("../config")

const loginCtrll = async (req, res) => {
    const { nameUser, password } = req.body
    const user = await User.findOne({ nameUser: nameUser })

    if (user == null) {
        return res.status(401).json({
            ress: "user doest not exist or incorrect password"
        })
    }
    else {
        var passwordCoparate = await bcrypt.compare(password, user.passwordHash)
    }

    if (passwordCoparate) {
        const dataToken = {
            id: user.id,
            fullName: user.fullName
        }
        const token = jwt.sign(dataToken, PRIVATEKEY)
        return res.status(200).json({
           token,
           nameUser: user.nameUser
        })
    } else {
        return res.status(401).json({
            ress: "incorrect password"
        })
    }
}
module.exports = loginCtrll