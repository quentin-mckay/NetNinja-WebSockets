var express = require('express');
var socket = require('socket.io');


// App setup
var app = express();
var server = app.listen(process.env.PORT || 4000, function() {
  console.log('listening for requests on port 4000');
});


// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

// when a client makes a connection
io.on('connection', function(socket) {
  // passed in socket refers to individual socket that is connected
  console.log('made socket connection', socket.id);

  // when we recieve a 'chat' data from the individual
  socket.on('chat', function(data) {
    // send a 'chat' data to ALL of the connected sockets
    io.sockets.emit('chat', data);
  })

  socket.on('typing', function(data) {
    // emit to every other single client
    socket.broadcast.emit('typing', data);
  })
})
