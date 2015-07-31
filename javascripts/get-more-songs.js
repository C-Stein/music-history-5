// The get-more-songs file should contain the AJAX call to your second JSON 
// file with songs in it. This module should return the array of songs.

var moreMusicContent = [];

function moreMusic() {
  $.ajax({
  	url:"moreSongs.json"
  }).done(function(data){
    moreMusicContent = data;
    addSongsToDom(moreMusicContent.songs);
    $more.hide();
  });
}


define(function() {

  return {
    getMoreMusic: function() {
      return moreMusic();
    },
    getMoreMusicContent: function() {
      return moreMusicContent;
    }
  };
});