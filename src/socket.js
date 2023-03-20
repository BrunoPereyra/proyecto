const Conversation = require("./models/conversation");
const Message = require("./models/message");

const socket = (io) => {
    io.on('connection', (socket) => {
        const senderId = socket.request._query.userId; // OBTENEMOS EL ID DEL USUARIO QUE ENVÍA EL MENSAJE
        socket.join(senderId)
        
        // Manejar la desconexión del usuario
        socket.on('disconnect', () => {
            console.log("disconnect");
        });
        
        // Manejar los mensajes enviados por el usuario
        socket.on('message_destinatario', async (text, recipientId) => {

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
            
            const newMessage = await message.save();
            io.to(senderId).emit('message', newMessage);
            io.to(recipientId).emit('message', newMessage);
        });
    });
};

module.exports = socket;
