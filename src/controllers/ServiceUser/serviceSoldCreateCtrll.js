const Users = require("../../models/users")
const ServicesSoldUser = require("../../models/servicesSoldUser")

const { cloudinary } = require("../../helpers/cloudinary")

const fs = require("fs")


const serviceSoldCreateCtrll = async (req, res) => {
    const { idUser } = req
    const { nameService, description, zone, price, time_unit, time_magnitud, labels } = req.body
    const user = await Users.findById(idUser)
    const result = await cloudinary.uploader.upload(req.file.path)

    fs.unlink(req.file.path, (err) => {
        if (err) {
            return res.status(500).json({
                res: "error server"
            })
        }
        console.log('Archivo eliminado con éxito');
    });

    if (user.servicesSoldUser[4]) {
        const servicesUser = new ServicesSoldUser({
            nameService,
            description,
            zone,
            price,
            time: [{ time_unit, time_magnitud }],
            image: {
                url: result.url,
                public_id: result.public_id
            },
            labels,
            date: new Date(),
            User: idUser
        })
        const servicesUserSave = await servicesUser.save()
        user.servicesSoldUser = user.servicesSoldUser.concat(servicesUserSave.id)
        await user.save()
        return res.status(201).json({
            res: servicesUserSave
        })
    } else {
        res.status(406).json({
            res: "servicesSoldUser exist"
        })
    }

}
module.exports = serviceSoldCreateCtrll