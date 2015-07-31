//The populate-songs file should contain the AJAX call to your first JSON file 
// ith songs in it. This module should return the array of songs.


function loadMusic() {
  $.ajax({
    url:"javascripts/songs.json"
  }).done(function(data){
    var musicContent = data;
    var songs = musicContent.songs;
    // addSongsToDom(musicContent.songs);
    console.log("songs", songs);
    return songs;
  });
}


define(function() {

  return {
    getLoadMusic: function() {
      return loadMusic();
    },
    getMusicContent: function() {
      return musicContent;
    }
  };
});