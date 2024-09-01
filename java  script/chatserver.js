const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (token) {
        jwt.verify(token, 'your_secret_key', (err, decoded) => {
            if (err) return next(new Error('Authentication error'));
            socket.user = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {
    socket.on('chat message', (data) => {
        const { message, receiverId } = data;
        const senderId = socket.user.userId;
        io.to(receiverId).emit('chat message', { message, senderId });
        // Save message to the database
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
