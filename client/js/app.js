
var socket = io.connect('http://localhost:8000');

socket.on('values', function (data) {
  console.log(data);
  $('#scrollFirst').height(data.scrollFirst)
});

socket.on('values2', function (data) {
  console.log(data);
  $('#scrollSecond').height(data.scrollFirst)
});