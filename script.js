const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const nameInput = document.getElementById('name');
const messages = document.getElementById('messages');
const usersDiv = document.getElementById('users');

// helper to add message to list
function addMessage({name, message, time}) {
  const li = document.createElement('li');
  const t = document.createElement('span');
  t.className = 'time';
  t.textContent = time;
  li.innerHTML = '<strong>' + escapeHtml(name) + ':</strong> ' + escapeHtml(message) + ' ';
  li.appendChild(t);
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
}

// basic escaping
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// receive messages
socket.on('chat message', (data) => {
  addMessage(data);
});

// receive users count
socket.on('users', (count) => {
  usersDiv.textContent = 'Users online: ' + count;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim() || 'Anonymous';
  const message = input.value.trim();
  if (!message) return;
  const now = new Date();
  const time = now.toLocaleTimeString();
  const payload = { name, message, time };
  socket.emit('chat message', payload);
  input.value = '';
  input.focus();
});
