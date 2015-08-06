define(function() {
  
  return {

    addMusic: function(newSong)  {
      $.ajax({
        url:"https://vivid-heat-717.firebaseio.com/songs.json",
        method: "POST",
        data: newSong
      }).done(function(addedSong){
      console.log("added song", addedSong);
      });
    }
  };
});

