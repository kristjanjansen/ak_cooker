var movie = bonsai.run(
  document.getElementById('canvas'),
  {
    code: function() {
      var circles = 80,
      centerX = 300,
      centerY = 300,
      distance = 300,
      radius = 7
      
      var container = new Group().addTo(stage);
      
      
      for (var i = 0; i < circles; ++i) {
        var f = i / circles,
            x = centerX + distance * Math.sin(f*2*Math.PI),
            y = centerY + distance * -Math.cos(f*2*Math.PI),

        circle = bonsai.Path.circle(x, y, radius)
          .attr({
            strokeWidth: 3
          });
        circle.x = x;
        circle.y = y;
        circle.addTo(container)
      }
      
      container.attr({
        'x': 50,
        'y': 50,
        'rotation': 0
      })
      
     stage.on('message', function(data) {


       var c = container.children();
       
       if (data.val1) {
         var val1 = Math.round((((data.val1 - 0) * circles ) / 100) / 4) + 1
       }
       if (data.val2) {
         var val2 = Math.round((((data.val2 - 0) * circles ) / 100) / 4) + 1
       }
       for (var i = 0, circle; (circle = c[i++]); ) {
         if (val1 && i < val1) {
           circle.attr({
             strokeColor: 'white',
             fillColor: 'white'
             }
           );
         } else 
         if (val2 && i < val2) {
           circle.attr({
             fillColor: 'red'
             }
           );
         } else {
           circle.attr({
             strokeColor: 'black',
             fillColor: 'black'
            })
         }
       }

      });
      
    }
  }
);


$.getJSON('/config.json', function(config) {

  var socket = io.connect(config.host);

  socket.on('meterRed', function (data) {
    movie.sendMessage({
      val2: data.value
     });
  });
  socket.on('meterWhite', function (data) {
    movie.sendMessage({
      val1: data.value
     });
  });

})

