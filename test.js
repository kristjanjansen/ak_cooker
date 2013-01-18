var fs = require('fs');

var five = require("johnny-five")
var each = require("each")

var value = 0
var value2 = 0

var board = new five.Board();

board.on("ready", function() {

    potentiometer = new five.Sensor({
      pin: "A0",
      freq: 100
    });
    
    var wait = 0
    
    potentiometer.on("read", function( err, v ) {
      var new_value = convertRange(v, 9, 902, 0, 150)
      if (new_value < value || new_value > value) {
        value = new_value
        console.log(value)
      } else {
        wait++
      }
      if (wait > 10) {
        if (value > value2) {
          value2++
          console.log('Climb: ' + value2)
        }
        if (value < value2) {
          value2--
          console.log('Climb: ' + value2)
        }
        wait = 0
      }
    });

})


function convertRange(val, old_min, old_max, new_min, new_max) {
 return Math.round((((val - old_min) * (new_max - new_min) ) / (old_max - old_min)) + new_min)
}


function delayMeter2(valOld, valNew) {
  if (valOld > valNew) {
  }
}


function delayMeter(valOld, valNew) {

var values = []

if (valOld > valNew) {
  var tmp = valOld
  valOld = valNew
  valNew = tmp
  var reverse = true
}

for (var i=valOld; i < valNew + 1; i++) {
 values.push(i)
}

each(reverse ? values.reverse() : values)
.on('item', function(item, index, next) {
  console.log('Delayed: ' + item)
  setTimeout(next, 500)
})
}

//delayMeter(10, 10)


