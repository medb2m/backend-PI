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
        console.log('User connected : ', socket.user.username);

        socket.on('send message', (msg) => {
            if (socket.user) {
                const messageData = {
                    userID : socket.user._id,
                    name: socket.user.username,
                    message: msg
                };
                // Save the msg in DB
                addMessage({ body: messageData, user: socket.user }, null);
                // broadcast msg
                io.emit('receive message', messageData);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}
