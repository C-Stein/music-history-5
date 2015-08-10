define(function() {
  
  return {


 var myFirebaseRef = new Firebase("https://vivid-heat-717.firebaseio.com/");
    //changes your library on the fly when changes happen on firebase
    myFirebaseRef.on("value", function(snapshot) {
      console.log(snapshot.val());  
      loadedSongs = snapshot.val();
      loadSongs(loadedSongs);
      for (var key in loadedSongs) {
        allSongsArray[allSongsArray.length] = loadedSongs[key];
      }
    });

  }
});  
