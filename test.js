var fs = require('fs');
var five = require("johnny-five")

var tako = require('tako')
var app = tako()
app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');
app.httpServer.listen(8000)


var value = 0
var value2 = 0

var board = new five.Board();

board.on("ready", function() {

    potentiometer = new five.Sensor({
      pin: "A0"
      , freq: 5
    });
    
    var wait = 0

app.sockets.on('connection', function (socket) {
  
    potentiometer.on("read", function( err, v ) {
      var new_value = convertRange(v, 9, 902, 0, 150)
      if (new_value < value || new_value > value) {
        value = new_value
        console.log(value)
        app.sockets.emit('values', { scrollFirst: value});        
      } else {
        wait++
      }
      if (wait > 5) {
        if (value > value2) {
          value2++
          console.log('Climb: ' + value2)
          app.sockets.emit('values2', { scrollFirst: value2});                  
        }
        if (value < value2) {
          value2--
          console.log('Climb: ' + value2)
          app.sockets.emit('values2', { scrollFirst: value2});                  
        }
        wait = 0
      }
    });

})

})

function convertRange(val, old_min, old_max, new_min, new_max) {
 return Math.round((((val - old_min) * (new_max - new_min) ) / (old_max - old_min)) + new_min)
}
