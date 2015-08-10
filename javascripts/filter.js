  define(function() {
  
  return {
    filterSongs: function (selectedartist, selectedalbum) {
      _.find($(".artist"), function(match){  
        if (selectedartist != $(match).text()) {
          $(match).parent().hide();
        } else {
          $(match).parent().show();
        }
      }), "artist";

      _.find($(".album"), function(match){
        if (selectedalbum != $(match).text()) {
          $(match).parent().hide();
        } else {
          $(match).parent().show();
        }
      }), "album";
    }
  };
});