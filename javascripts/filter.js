define(function() {
  
  return {
    filterArtist: function (selectedartist) {
      _.find($(".artist"), function(match){  
        if (selectedartist != $(match).text()) {
          $(match).parent().hide();
        } else {
          $(match).parent().show();
        }
      }, 'artist');
    },

    filterAlbum: function (selectedalbum) {
      _.find($(".album"), function(match){
        if (selectedalbum != $(match).text()) {
          $(match).parent().hide();
        } else {
          $(match).parent().show();
        }
      }, 'album');
    }
  };
});