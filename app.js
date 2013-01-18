var fs = require('fs');
var os = require('os');
var five = require("johnny-five")
var tako = require('tako')

var port  = 8000

var app = tako()
app.route('/config.json').json({host: os.hostname() + '.local:' + port});
app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');
app.httpServer.listen(port)


var meterRed = 0
var meterWhite = 0
var delay = 10

var board = new five.Board();

board.on("ready", function() {

    potentiometer = new five.Sensor({
      pin: "A0"
      , freq: 5
    });
    
    var wait = 0

    app.sockets.on('connection', function (socket) {
  
    app.sockets.emit('meterWhite', { value: meterWhite});        
    app.sockets.emit('meterRed', { value: meterRed});        
    
    potentiometer.on("read", function( err, v ) {
      var new_value = convertRange(v, 9, 902, 0, 150)
      if (new_value < meterWhite || new_value > meterWhite) {
        meterWhite = new_value
        app.sockets.emit('meterWhite', { value: meterWhite});        
      } else {
        wait++
      }
      if (wait > delay) {
        if (meterWhite > meterRed) {
          meterRed++
          app.sockets.emit('meterRed', { value: meterRed});        
        }
        if (meterWhite < meterRed) {
          meterRed--
          app.sockets.emit('meterRed', { value: meterRed});        
        }
        wait = 0
      }
    });

})

})

function convertRange(val, old_min, old_max, new_min, new_max) {
 return Math.round((((val - old_min) * (new_max - new_min) ) / (old_max - old_min)) + new_min)
}