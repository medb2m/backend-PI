import { addMessage } from '../controllers/chat.controller.js';

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
        console.log('A user connected');

        socket.on('send name', (username) => {
            socket.username = username;
            console.log('Username:', username);
            // broadcast name
            io.emit('send name', (username));
        });

        socket.on('send message', (msg) => {
            console.log('Message:', msg);
            if (socket.username) {
                const message = {
                    name: socket.username,
                    message: msg
                };
                // Save the msg in DB
                addMessage({ body: message }, null);
                // broadcast msg
                io.emit('receive message', message);
            }
            io.emit('send message', (msg)); 
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}
