// The get-more-songs file should contain the AJAX call to your second JSON 
// file with songs in it. This module should return the array of songs


define(function() {
  
  return {

    moreMusic: function(callback)  {
      $.ajax({
      url:"javascripts/moreSongs.json"
      }).done(function(data){
      $("#more").hide();
      callback.call(this, data);
      });
    }
  };
});