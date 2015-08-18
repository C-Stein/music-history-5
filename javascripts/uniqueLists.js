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
    //console.log("uniqueArtists", uniqueArtists);
    return uniqueArtists;

    }

  function uniqueAlbum(snapshot) {
    loadedSongs = snapshot.val();
    for (var key in loadedSongs) {
      allSongsArray[allSongsArray.length] = loadedSongs[key];
    }
    
    uniqueAlbums = _.chain(allSongsArray)
                          .uniq("album")
                          .pluck("album")
                          .value();
    //console.log("uniqueAlbums", uniqueAlbums);
    return uniqueAlbums;

    }


  return {

    getUniqueArtistList: function(data) {
      return uniqueArtist(data);
    },

    getUniqueAlbumList: function(data) {
      return uniqueAlbum(data);
    }

  };
});  


//.chain .uniq .pluck .val