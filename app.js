var fs = require('fs');

var five = require("johnny-five")
var tako = require('tako')

var app = tako()

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

app.sockets.on('connection', function (socket) {

  var board = new five.Board();

  board.on("ready", function() {

    potentiometer = new five.Sensor({
      pin: "A0",
      freq: 100
    });

    potentiometer.on("read", function( err, value ) {
      var new_value = convertRange(value, 9, 902, 0, 100)
      console.log(value,  new_value);
      app.sockets.emit('values', { scrollFirst: new_value});
    });

  })
  
})

function convertRange(val, old_min, old_max, new_min, new_max) {
 return Math.round((((val - old_min) * (new_max - new_min) ) / (old_max - old_min)) + new_min)
}