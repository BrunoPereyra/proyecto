const ServicesSoldUser = require("../models/servicesSoldUser")
// const Users = require("../models/users")

const searchServiceCtrll = async (req, res) => {
    const { refService, id, page } = req.query

    if (id) {
        var Services = ""
        if (id.length == 24 && typeof id == "string") {
            Services = await ServicesSoldUser.findById(id)
            if (!Services) {
                return res.status(404).json({
                    res: "the service does not exist"
                })
            }
            return res.status(200).json({
                res: Services
            })

        } else {
            return res.status(404).json({
                res: "missing data or malformed id"
            })
        }
    }

    if (typeof (refService) == "string") {

        let Service = await ServicesSoldUser.find({
            $text: { $search: refService }
        }).limit(20)
        if (Service.length == 0) {
            return res.status(404).json({
                res: "missing data or malformed refService"
            })
        } else if (Service.length >= 1) {
            return res.status(200).json({
                res: Service
            })
        }

    } else {
        return res.status(200).json({
            res: "missing data or malformed refService"
        })
    }

}
module.exports = searchServiceCtrll