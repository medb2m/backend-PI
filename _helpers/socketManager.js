import { addMessage } from '../controllers/chat.controller.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export function handleSocketEvents(io) {
    // verify User
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, secret);
            const user = await User.findById(decoded.id);
            if (!user) {
                return next(new Error('User not found'));
            }

            socket.user = user;
            next();
        } catch (err) {
            return next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected : ', socket.user.firstname);

        socket.on('send message', async ({ claimID, receiverID, message}) => {
            if (socket.user) {
                const messageData = {
                    senderID : socket.user._id,
                    receiverID,
                    claimID,
                    senderName: socket.user.firstname,
                    message
                };
                // Save the msg in DB
                await addMessage({ body: messageData, user: socket.user }, null);
                // Emit message to receiver only
                socket.to(receiverID).emit('receive message', messageData);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}
