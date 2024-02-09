const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// connects to socket
io.on('connection', (socket) => {
  console.log('a user connected');

  // when a user sends message to server
  socket.on('message', (msg) => {
    io.emit('message', msg);
  })
  // when a user disconnects from server
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('typing', (data) => {
    io.emit('typing', data);
  })

})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
