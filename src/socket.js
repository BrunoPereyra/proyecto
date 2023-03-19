const Conversation = require("./models/conversation");
const Message = require("./models/message");

const socket = (io) => {
    io.on('connection', (socket) => {

        // Manejar la desconexión del usuario
        socket.on('disconnect', () => {
        });

        // Manejar los mensajes enviados por el usuario
        socket.on('message', async (text, recipientId) => {
            const senderId = socket.request._query.userId; // OBTENEMOS EL ID DEL USUARIO QUE ENVÍA EL MENSAJE

            // BUSCAMOS LA CONVERSACIÓN EXISTENTE ENTRE LOS DOS USUARIOS
            const conversation = await Conversation.findOne({
                members: { $all: [senderId, recipientId] }
            });

            let conversationId;

            if (conversation) {
                conversationId = conversation._id;
            } else {
                // SI NO HAY UNA CONVERSACIÓN EXISTENTE, CREAMOS UNA NUEVA
                const newConversation = new Conversation({
                    members: [senderId, recipientId]
                });

                const savedConversation = await newConversation.save();

                conversationId = savedConversation._id;
            }

            // CREAMOS UN NUEVO MENSAJE Y LO GUARDAMOS EN LA COLECCIÓN DE MENSAJES DE LA CONVERSACIÓN
            const message = new Message({
                conversationId,
                senderId,
                recipientId,
                text
            });

            await message.save();

            // ENVIAMOS EL MENSAJE A AMBOS USUARIOS
            io.to(senderId).emit('message', message);
            io.to(recipientId).emit('message', message);
        });
    });
};

module.exports = socket;
