$.getJSON('/config.json', function(config) {

  var socket = io.connect(config.host);

  socket.on('meterRed', function (data) {
    $('#meterRed').height(data.value)
  });
  socket.on('meterWhite', function (data) {
    $('#meterWhite').height(data.value)
  });

})