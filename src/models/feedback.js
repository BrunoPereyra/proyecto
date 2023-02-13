const { model, Schema } = require("mongoose")

const SchemaFeedbackService = new Schema({
    coment: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userByService: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    ByUser: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    ServicesSoldUser: [{
        type: Schema.Types.ObjectId,
        ref: "ServicesSoldUser"
    }]
})
SchemaFeedbackService.set("toJSON", {
    transform: (returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const FeedbackService = model("FeedbackService", SchemaFeedbackService)
module.exports = FeedbackService