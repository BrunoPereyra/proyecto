const Users = require("../models/users")
const FeedbackService = require("../models/feedback")
const ServicesSoldUser = require("../models/servicesSoldUser")

const feedbackCtrll = async (req, res) => {
    const { idUser } = req
    const { coment, ServicesSoldUserId, stars, userByServiceId } = req.body
    
    const service = await ServicesSoldUser.findById(ServicesSoldUserId)
    const user = await Users.findById(userByServiceId)
    if (!service || !user) {
        return res.status(404).json({
            res: "service does not exist or user"
        })
    }

    if ( JSON.stringify(service.User[0]) !== JSON.stringify(user.id) ) {
        return res.status(200).json({
            res: "Id User y Id service does not match"
        })
    }

    const feedback = new FeedbackService({
        coment,
        stars,
        date: new Date(),
        userByService: userByServiceId,
        ByUser: idUser,
        ServicesSoldUser: ServicesSoldUserId
    })


    const feedbackSave = await feedback.save()

    let userByService = await Users.findById(userByServiceId)
    let ServicesSoldUserSave = await ServicesSoldUser.findById(ServicesSoldUserId)
    
    if (!ServicesSoldUserSave || !userByService) {
        return res.status(404).json({
            res: "server error"
        })
    }
    try {
        userByService.FeedbackService = userByService.FeedbackService.concat(feedbackSave.id)
        ServicesSoldUserSave.FeedbackService = ServicesSoldUserSave.FeedbackService.concat(feedbackSave.id)
        ServicesSoldUserSave.stars = ServicesSoldUserSave.stars.concat(stars)
        await userByService.save()
        await ServicesSoldUserSave.save()

    } catch (error) {
        return res.status(404).json({
            res: "server error",
            err: error
        })
    }

    if (!feedbackSave ) {
        return res.status(404).json({
            res: "server error"
        })
    } else {
        return res.status(201).json({
            res: feedbackSave
        })
    }
}
module.exports = feedbackCtrll