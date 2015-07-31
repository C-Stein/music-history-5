//The populate-songs file should contain the AJAX call to your first JSON file 
// ith songs in it. This module should return the array of songs.



var loadMusic = function()  {
  $.ajax({
    url:"javascripts/songs.json", async:false
  }).done(function(data){
    var musicContent = data;
    songs = musicContent.songs;
    // addSongsToDom(musicContent.songs);
    console.log("songs", songs);
      });
  return songs;
};


define(function() {
  var songs = [];
  return {
    getLoadMusic: function() {
      return loadMusic();
    }

  };
});