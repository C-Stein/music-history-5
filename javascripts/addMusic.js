define(["jquery", "q"], function($, Q) {
  
  return function(newSong){

      $.ajax({
        url:"https://vivid-heat-717.firebaseio.com/songs.json",
        method: "POST",
        data: newSong
      }).done(function(addedSong){
          console.log("addedSong", addedSong);
     
      });

  };
});

