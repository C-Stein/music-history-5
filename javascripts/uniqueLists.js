define(function() {
  
  var uniqueArtists;

  function uniqueArtist(snapshot) {
    loadedSongs = snapshot.val();
    for (var key in loadedSongs) {
      allSongsArray[allSongsArray.length] = loadedSongs[key];
    }
    
    uniqueArtists = _.chain(allSongsArray)
                          .uniq("artist")
                          .pluck("artist")
                          .value();
    console.log("uniqueArtists", uniqueArtists);
    return uniqueArtists;

    }


  return {

    getUniqueArtistList: function(data) {
      return uniqueArtist(data);
    },

  };
});  


//.chain .uniq .pluck .val