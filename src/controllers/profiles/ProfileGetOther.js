const Users = require("../../models/users")

const ProfileGetOther = async (req, res) => {
    const { idUserProfile } = req.body
    try {
        const user = await Users.findById(idUserProfile)
            .populate("servicesSoldUser")
            .populate({
                path: 'FeedbackService',
                options: { limit: 5, sort: { date: -1 } },
                populate:{path:"ByUser"}
              })
        res.status(200).json({
            res: user
        })
    } catch (error) {
        res.status(500).json({
            res: error
        })
    }

}
module.exports = ProfileGetOther