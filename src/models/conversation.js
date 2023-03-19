const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation
