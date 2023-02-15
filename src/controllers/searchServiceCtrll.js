const ServicesSoldUser = require("../models/servicesSoldUser")

const searchServiceCtrll = async (req, res) => {
    const { refService, id, page, } = req.query
    const { filter = [null, null] } = req.body


    if (id) {
        var Services = ""
        if (id.length == 24 && typeof id == "string") {
            Services = await ServicesSoldUser.findById(id)
            Services.visitorCounter = await Services.visitorCounter + 1
            await Services.save()
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
        var Service
        try {

            if (filter[0] && filter[1]) {

                Service = await ServicesSoldUser.find({
                    $text: { $search: refService }
                })
                    .sort({ visitorCounter: -1 })
                    .populate("User")
                    .sort((a, b) => {
                        if (a.user.isPremium === b.user.isPremium) {
                            return 0;
                        }
                        return a.user.isPremium ? -1 : 1
                    })
                    .limit(20)

            } else if (filter[0]) {
                try {
                    Service = await ServicesSoldUser.find({
                        $text: { $search: refService }
                    })
                        .populate({
                            path: "User",
                            options: {
                                sort: { "isPremium": -1 }
                            }
                        })
                        .sort({"User.isPremium": 1})
                        .limit(20)

                } catch (error) {
                    console.log(error)
                }


            } else if (filter[1]) {

                Service = await ServicesSoldUser.find({
                    $text: { $search: refService }
                })
                    .sort({ visitorCounter: -1 })

            } else {
                Service = await ServicesSoldUser.find({
                    $text: { $search: refService }
                })
            }

            if (Service.length == 0) {
                return res.status(404).json({
                    res: "missing data or malformed refService"
                })
            } else if (Service.length >= 1) {
                return res.status(200).json({
                    res: Service
                })
            }
        } catch (err) {
            return res.status(400).json({
                err
            })
        }

    } else {
        return res.status(200).json({
            res: "missing data or malformed refService"
        })
    }

}
module.exports = searchServiceCtrll