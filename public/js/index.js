var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

// use in console
// socket.emit('createMessage', {
//   from: 'Henrique',
//   text: 'Hey, how are you?'
// })
