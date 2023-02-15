const { Schema, model } = require("mongoose")

const SchemaServicesSoldUser = new Schema({
    nameService: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    zone: {
        type: String,
        require: true
    },
    price: {
        type: String,
        required: true
    },
    time: {
        type: [],
        required: true
    },
    img: {
        type: [],
    },
    date: {
        type: Date,
        require: true
    },
    User: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    FeedbackService: [{
        type: Schema.Types.ObjectId,
        ref: "FeedbackService"
    }],
    // labels: {
    //     type: [String, String, String, String],
    //     require: true
    // },
    stars: {
        type: [],
    },

    visitorCounter: {
        type: Number,
        default: 0
    },
    serviceStatistics: [{

        revenue: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            require: true
        },
        userBuyId: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }
    }]
})

SchemaServicesSoldUser.set("toJSON", {
    transform: (returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

SchemaServicesSoldUser.index({ nameService: "text" })
// SchemaServicesSoldUser.index({ labels: "text" })

const ServicesSoldUser = model("ServicesSoldUser", SchemaServicesSoldUser)

module.exports = ServicesSoldUser