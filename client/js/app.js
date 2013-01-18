
var socket = io.connect('http://localhost:8000');

socket.on('meterRed', function (data) {
  $('#meterRed').height(data.value)
});

socket.on('meterWhite', function (data) {
  $('#meterWhite').height(data.value)
});