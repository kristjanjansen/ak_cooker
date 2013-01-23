
var movie = bonsai.run(
  document.getElementById('canvas'),
  {
    code: function() {

      var limit = 3
      
      var meter1 = new Rect(50, 50, 20, 100).attr({
        fillColor: 'white',
        cornerRadius: 3
      })
      .addTo(stage);
      console.log(meter1.attr())
      
      var meter2 = new Rect(80, 50, 20, 100).attr({
        fillColor: 'red',
        cornerRadius: 3
      })
      .addTo(stage);
            
     stage.on('message', function(data) {
       if (data.val1) {
         meter1.attr('height', (data.val1 * 1.2))
       }
       if (data.val2) {
         meter2.attr('height', (data.val2 * 1.2))
       }
       if (data.val1 < limit) {
         meter1.attr('opacity', 0)
       } else if (data.val1 >= limit) {
         meter1.attr('opacity', 1)
       }
       if (data.val2 < limit) {
         meter2.attr('opacity', 0)
       } else if (data.val2 >= limit) {
         meter2.attr('opacity', 1)
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

