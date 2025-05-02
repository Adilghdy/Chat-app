const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Real-Time Chat App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="chat-container">
    <h1>Chat App</h1>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" placeholder="Type a message..." />
      <button>Send</button>
    </form>
  </div>

  <!-- Include Socket.IO client library -->
  <script src="/socket.io/socket.io.js"></script>
  <!-- Include client-side JavaScript -->
  <script src="script.js"></script>
</body>
</html>body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.chat-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

#messages {
  list-style-type: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

#messages li {
  padding: 10px;
  margin: 5px 0;
  background: #e9e9e9;
  border-radius: 5px;
}

#form {
  display: flex;
  gap: 10px;
}

#input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}// Connect to the Socket.IO server
const socket = io();

// Get DOM elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // Emit the message to the server
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Listen for incoming messages
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
  // Scroll to the bottom of the messages
  messages.scrollTop = messages.scrollHeight;
});
