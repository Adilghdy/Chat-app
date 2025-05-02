const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update to your Render URL in production
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  // Handle username sent from client
  socket.on('set-username', (username) => {
    socket.username = username; // Store username on socket
    console.log(`${username} connected: ${socket.id}`);
    // Broadcast join message to all clients except the sender
    socket.broadcast.emit('user-joined', `${username} joined the chat`);
  });

  // Handle chat messages
  socket.on('chat message', (msg) => {
    // Include username in the message
    io.emit('chat message', { username: socket.username, text: msg });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (socket.username) {
      console.log(`${socket.username} disconnected: ${socket.id}`);
      // Broadcast disconnect message
      io.emit('user-left', `${socket.username} left the chat`);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
