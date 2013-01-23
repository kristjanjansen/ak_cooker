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
      
      var container1 = new Group().addTo(stage);
      var container2 = new Group().addTo(stage);
      
      
      for (var i = 0; i < circles; ++i) {
        var f = i / circles,
            x = centerX + distance * Math.sin(f*2*Math.PI),
            y = centerY + distance * -Math.cos(f*2*Math.PI),

        circle1 = bonsai.Path.circle(x, y, radius1)
          .attr({
            fillColor: 'white',
            opacity: 0            
          });
        circle1.x = x;
        circle1.y = y;
        circle1.addTo(container1)

        circle2 = bonsai.Path.circle(x, y, radius2)
          .attr({
            fillColor: 'red',
            opacity: 0            
          });
        circle2.x = x;
        circle2.y = y;
        circle2.addTo(container2)
        
      }
      

            
     stage.on('message', function(data) {
       
       var c1 = container1.children();
       var c2 = container2.children();
       
       if (data.val1) {
         var val1 = Math.round((((data.val1 - 0) * circles ) / 100))
       }
       if (data.val2) {
         var val2 = Math.round((((data.val2 - 0) * circles ) / 100))
       }
       
       for (var i = 0; i < c1.length; i++) {
         if (i <= val1) {
           c1[i].attr({ opacity: 1})
         } else if (i > val1){
           c1[i].attr({ opacity: 0})
         }
         
         if (i <= val2) {
           c2[i].attr({ opacity: 1})
         } else if (i > val2){
           c2[i].attr({ opacity: 0})
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

