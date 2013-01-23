var movie = bonsai.run(
  document.getElementById('canvas'),
  {
    code: function() {
      var circles = 50,
      centerX = 230,
      centerY = 230,
      distance = 200,
      radius1 = 6
      radius2 = 4
      
      var containerWhite = new Group().addTo(stage);
      var containerRed = new Group().addTo(stage);
      
      
      for (var i = 0; i < circles; ++i) {
        var f = i / circles,
            x = centerX + distance * Math.sin(f*2*Math.PI),
            y = centerY + distance * -Math.cos(f*2*Math.PI),

        circleWhite = bonsai.Path.circle(x, y, radius1)
          .attr({
            fillColor: 'white',
            opacity: 0            
          });
          
        circleWhite.x = x;
        circleWhite.y = y;
        circleWhite.addTo(containerWhite)

        circleRed = bonsai.Path.circle(x, y, radius2)
          .attr({
            fillColor: 'red',
            opacity: 0            
          });
          
        circleRed.x = x;
        circleRed.y = y;
        circleRed.addTo(containerRed)
        
      }
      

            
     stage.on('message', function(data) {
       
       var c1 = containerWhite.children();
       var c2 = containerRed.children();
       
       if (data.meterWhiteVal) {
         var meterWhiteVal = Math.round((((data.meterWhiteVal - 0) * circles ) / 100)) - 3
       }
       if (data.meterRedVal) {
         var meterRedVal = Math.round((((data.meterRedVal - 0) * circles ) / 100)) - 3
       }
       
       for (var i = 0; i < c1.length; i++) {
         if (i <= meterWhiteVal) {
           c1[i].attr({ opacity: 1})
         } else if (i > meterWhiteVal){
           c1[i].attr({ opacity: 0})
         }
         
         if (i <= meterRedVal) {
           c2[i].attr({ opacity: 1})
         } else if (i > meterRedVal){
           c2[i].attr({ opacity: 0})
         }
          
       }

      });
      
    }
  }
);


$.getJSON('/config.json', function(config) {

  var socket = io.connect(config.host);

  socket.on('meterWhite', function (data) {
    movie.sendMessage({
      meterWhiteVal: data.value
     });
  });

  socket.on('meterRed', function (data) {
    movie.sendMessage({
      meterRedVal: data.value
     });
  });


})

