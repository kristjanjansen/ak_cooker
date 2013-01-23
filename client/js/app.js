var movie = bonsai.run(
  document.getElementById('canvas'),
  {
    code: function() {

      var limit = 7
      
      var meterWhite = new Rect(50, 50, 30, 100).attr({
        fillColor: 'white',
        cornerRadius: 7
      })
      .addTo(stage);
      console.log(meterWhite.attr())
      
      var meterRed = new Rect(100, 50, 30, 100).attr({
        fillColor: 'red',
        cornerRadius: 7
      })
      .addTo(stage);
            
     stage.on('message', function(data) {
       if (data.meterWhiteVal) {
         meterWhite.attr('height', (data.meterWhiteVal * 4))
       }
       if (data.meterRedVal) {
         meterRed.attr('height', (data.meterRedVal * 4))
       }
       if (data.meterWhiteVal < limit) {
         meterWhite.attr('opacity', 0)
       } else if (data.meterWhiteVal >= limit) {
         meterWhite.attr('opacity', 1)
       }
       if (data.meterRedVal < limit) {
         meterRed.attr('opacity', 0)
       } else if (data.meterRedVal >= limit) {
         meterRed.attr('opacity', 1)
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

