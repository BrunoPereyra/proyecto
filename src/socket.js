const Conversation = require("./models/conversation")
const Message = require("./models/message")


const socket = (io) => {
    io.on('connection', (socket) => {


        const userId = socket.request._query['userId'];
        socket.join(userId);

        socket.on('message', async (text, recipientId) => {
            const conversation = await Conversation.findOne({
                members: { $all: [userId, recipientId] }
            });

            let conversationId;

            if (conversation) {
                conversationId = conversation._id;
            } else {
                const newConversation = new Conversation({
                    members: [userId, recipientId]
                });

                const savedConversation = await newConversation.save();

                conversationId = savedConversation._id;
            }

            const message = new Message({
                conversationId,
                senderId: userId,
                recipientId,
                text,
            });

            await message.save();

            io.to(userId).emit('message', message);
            io.to(recipientId).emit('message', message);
        });
    })

}
module.exports = socket