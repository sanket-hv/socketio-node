const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // On message
    // Event : 'chat message'
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg)
    });

    // on disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(8000, () => {
    console.log('listening on *:8000');
});