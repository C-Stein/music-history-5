//The populate-songs file should contain the AJAX call to your first JSON file 
// ith songs in it. This module should return the array of songs.


define(function() {
  
  return {

    loadMusic: function(callback)  {
      $.ajax({
      url:"javascripts/songs.json"
      }).done(function(data){
      callback.call(this, data);
      });
    }
  };
});