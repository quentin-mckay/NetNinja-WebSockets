// Make connection
var socket = io.connect('http://localhost:4000');  // io is a global object included with socket.io

// Query DOM
var output = document.querySelector('#output');
var handle = document.querySelector('#handle');
var message = document.querySelector('#message');
var sendButton = document.querySelector('#send');

// Emit events
sendButton.addEventListener('click', function() {
  socket.emit('chat', {
    message:  message.value,
    handle: handle.value
  })
})

// Listen for events
socket.on('chat', function(data) {
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
})
