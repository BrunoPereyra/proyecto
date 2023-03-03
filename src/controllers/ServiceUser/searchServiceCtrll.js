const ServicesSoldUser = require("../../models/servicesSoldUser")

const searchServiceCtrll = async (req, res) => {
    const { refService, id, page, } = req.query
    const { filter = [false, false] } = req.body
    
    if (id) {
        var Services = ""
        if (id.length == 24 && typeof id == "string") {
            try {
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
            } catch (error) {
                return res.status(404).json({
                    res: "id error or service error"
                })
            }

        } else {
            return res.status(404).json({
                res: "missing data or malformed id"
            })
        }
    }
    
    if (typeof (refService) == "string") {
        var Service
        try {
            
            if (filter[0]) {
                try {
                    Service = await ServicesSoldUser.aggregate([
                        {
                            $match: { $text: { $search: refService } }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "User",
                                foreignField: "_id",
                                as: "User"
                            }
                        },
                        {
                            $unwind: "$User"
                        },
                        {
                            $sort: {
                                "User.isPremium.state": -1
                            }
                        },
                        {
                            $limit: 20
                        }
                    ]);

                } catch (err) {
                    Service = await ServicesSoldUser.find({
                        $text: { $search: refService }
                    })
                }


            } else if (filter[1]) {

                Service = await ServicesSoldUser.find({
                    $text: { $search: refService }
                })
                    .sort({ visitorCounter: -1 })

            } else {
                Service = await ServicesSoldUser.find({
                    $text: { $search: refService }
                }).populate("User")
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