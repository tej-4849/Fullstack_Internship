const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory user count (not persistent)
let users = 0;

io.on('connection', (socket) => {
  users++;
  console.log('a user connected, total:', users);

  // broadcast current users count
  io.emit('users', users);

  // receive chat messages from clients
  socket.on('chat message', (data) => {
    // data should be {name, message, time}
    io.emit('chat message', data); // broadcast to all
  });

  socket.on('disconnect', () => {
    users = Math.max(0, users - 1);
    console.log('user disconnected, total:', users);
    io.emit('users', users);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
