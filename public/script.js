// Connect to the Socket.IO server
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
