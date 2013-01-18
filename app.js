var fs = require('fs');

var five = require("johnny-five")
var tako = require('tako')

var app = tako()

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

app.sockets.on('connection', function (socket) {
  var value = 0
  
  app.sockets.emit('values', { scrollFirst: value});

  var board = new five.Board();

  board.on("ready", function() {

    potentiometer = new five.Sensor({
      pin: "A0",
      freq: 100
    });

    potentiometer.on("read", function( err, v ) {
      var new_value = convertRange(v, 9, 902, 0, 150)
      if (new_value < value || new_value > value) {
        value = new_value
        app.sockets.emit('values', { scrollFirst: value});
      }
    
    });

  })
  
})

function convertRange(val, old_min, old_max, new_min, new_max) {
 return Math.round((((val - old_min) * (new_max - new_min) ) / (old_max - old_min)) + new_min)
}