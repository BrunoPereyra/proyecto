const Users = require("../models/users")
const ProfileGet = async (req, res) => {
    const { idUser } = req
    try {
        const user = await Users.findById(idUser).populate("servicesSoldUser")
        res.status(200).json({
            res: user
        })
    } catch (error) {
        res.status(500).json({
            res: error
        })
    }

}
module.exports = ProfileGet