// The get-more-songs file should contain the AJAX call to your second JSON 
// file with songs in it. This module should return the array of songs.



var moreMusic = function() {
  $.ajax({
  	url:"javascripts/moreSongs.json", async:false
  }).done(function(data){
    var moreMusicContent = data;
    songs = moreMusicContent.songs;
    //addSongsToDom(moreMusicContent.songs);
    $("#more").hide();
    console.log("moreSongs", songs);
  });
  return songs;
}


define(function() {
  var songs = [];
  return {
    getMoreMusic: function() {
      return moreMusic();
    }

  };
});