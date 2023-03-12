const { PRIVATEKEY } = require("../config")
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

module.exports = async (req, res, next) => {

    const authorization = req.get('authorization')
    let token = ""
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7)
    } else {
        return res.status(401).json({ error: 'token missing or invalid' })
        next()
    }
    try {
        const decodetoken = jwt.verify(token, PRIVATEKEY)
        const user = await Users.findById(decodetoken.id)
        if (user == null) {
            return res.status(401).json({ error: 'token invalid or user not exist' })
        }
        req.idUser = decodetoken.id
        next()
    } catch (error) {
        return res.status(401).json({ error: 'token missing or invalid' })
        next()
    }
}