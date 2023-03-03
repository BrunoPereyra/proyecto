const Users = require("../../models/users")
const ServicesSoldUser = require("../../models/servicesSoldUser")


const serviceSoldCreateCtrll = async (req, res) => {
    const { idUser } = req
    const { nameService, description, zone, price, time, img, labels } = req.body
    const imageBuffer = req.file.buffer;
    
    const user = await Users.findById(idUser)

    if (!user.servicesSoldUser[0]) {
        const servicesUser = new ServicesSoldUser({
            nameService,
            description,
            zone,
            price,
            time,
            img:imageBuffer,
            labels,
            date: new Date(),
            User: idUser
        })
        const servicesUserSave = await servicesUser.save()
        user.servicesSoldUser = user.servicesSoldUser.concat(servicesUserSave.id)
        user.save()
        res.status(201).json({
            res: servicesUserSave
        })
    } else {
        res.status(406).json({
            res: "servicesSoldUser exist"
        })
    }

}
module.exports = serviceSoldCreateCtrll