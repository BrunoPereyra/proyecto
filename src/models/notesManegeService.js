const { Schema, model } = require("mongoose")

const SchemanotesManageService = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    User: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
})
const notesManageService = model("notesManageService",SchemanotesManageService)
module.exports = notesManageService