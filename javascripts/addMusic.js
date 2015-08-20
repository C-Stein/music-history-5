define(["jquery", "q"], function($, Q) {
  
  return function(newSong){

    var deferred = Q.defer();

      $.ajax({
        url:"https://vivid-heat-717.firebaseio.com/songs.json",
        method: "POST",
        data: newSong
      }).done(function(addedSong){
          console.log("addedSong", addedSong);
     
      });
      
    return deferred.promise;

  };
});

