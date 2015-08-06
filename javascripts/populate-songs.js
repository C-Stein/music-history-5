//The populate-songs file should contain the AJAX call to your first JSON file 
// ith songs in it. This module should return the array of songs.


define(function() {
  
  return {

    loadMusic: function(callback)  {
      $.ajax({
      url:"https://vivid-heat-717.firebaseio.com/.json"
      }).done(function(data){
      callback.call(this, data);
      });
    }
  };
});