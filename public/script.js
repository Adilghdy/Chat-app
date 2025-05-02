const socket = io();

const usernameForm = document.getElementById('username-form');
const usernameInput = document.getElementById('username-input');
const usernameContainer = document.getElementById('username-container');
const chatContainer = document.getElementById('chat-container');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle username submission
usernameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username) {
    // Send username to server
    socket.emit('set-username', username);
    // Hide username form, show chat
    usernameContainer.style.display = 'none';
    chatContainer.style.display = 'block';
  }
});

// Handle sending messages
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Display chat messages
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = `<strong>${msg.username}</strong>: ${msg.text}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// Display join notifications
socket.on('user-joined', (message) => {
  const li = document.createElement('li');
  li.className = 'notification';
  li.textContent = message;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// Display leave notifications
socket.on('user-left', (message) => {
  const li = document.createElement('li');
  li.className = 'notification';
  li.textContent = message;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
