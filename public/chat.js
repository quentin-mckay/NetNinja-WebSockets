// Make connection
//var socket = io.connect('http://localhost:4000');  // io is a global object included with socket.io

// Notice that I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page.
var socket = io();

// Query DOM
var output = document.querySelector('#output');
var handle = document.querySelector('#handle');
var message = document.querySelector('#message');
var sendButton = document.querySelector('#send');
var feedback = document.querySelector('#feedback');

// Emit events
sendButton.addEventListener('click', function() {
  socket.emit('chat', {
    message:  message.value,     // .value b/c it's an <input> field
    handle: handle.value
  })

})

message.addEventListener('keypress', function() {
  socket.emit('typing', {
    handle: handle.value
  })
})

// Listen for events coming from server code
// ...socket is one instance of the websocket in this particular client
socket.on('chat', function(data) {
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;

  // and clear the "... is typing..."
  feedback.innerHTML = '';
})

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data.handle} is typing a message...</em></p>`;
})
