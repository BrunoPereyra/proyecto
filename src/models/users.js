const { model, Schema } = require("mongoose")

const SchemaUser = new Schema({
  nameUser: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  servicesSoldUser: [{
    type: Schema.Types.ObjectId,
    ref: "ServicesSoldUser"
  }],
  FeedbackService: [{
    type: Schema.Types.ObjectId,
    ref: "FeedbackService"
  }],
  favorites: {
    type: Schema.Types.ObjectId,
    ref: "ServicesSoldUser"
  },
  purchasedService: [{
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      require: true
    },
    ServicesSoldUser: {
      type: Schema.Types.ObjectId,
      ref: "ServicesSoldUser"
    },

  }],
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
    },
    purchasedServiceeId: {
      type: Schema.Types.ObjectId,
      ref: "ServicesSoldUser"
    },
    purchasedServiceName: {
      type: String,
      required: true
    }
  }],
  isPremium: {
    state: {
      type: Number,
      default: -1
    },
    created: {
      type: Date,
      default: 0
    }
  }
})
SchemaUser.set("toJSON", {
  transform: (returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
    delete returnedObject.gmail
  }
})
const Users = model("Users", SchemaUser)

module.exports = Users