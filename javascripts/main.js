requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '/bower_components/firebase/firebase',
    'lodash': '/bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

    var allSongsArray = [];
requirejs(
  ["jquery", "lodash", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs", "addMusic", "firebase"], 
  function($, _, Handlebars, bootstrap, dom, populate, get, addMusic, _firebase) {
    var loadedSongs;
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



    $(document).on('click', '.delete', (hideSong));
    
    function loadSongs(data) {

      require(['hbs!../templates/songs'], function(songTemplate) {
      $("#library").prepend(songTemplate(data));
      });
      
      require(['hbs!../templates/albums'], function(formTemplate) {
      $("#selectedAlbum").append(formTemplate(data));
      });

      require(['hbs!../templates/artists'], function(formTemplate) {
      $("#selectedArtist").append(formTemplate(data));
      });
    }


  $("#addMusicButton").on("click", function(){
    var musicData = {};
    //grab values from form and store in object
      musicData = {
        "title": $("#addTitle").val(),
        "artist": $("#addArtist").val(),
        "album": $("#addAlbum").val(),
      };

      musicData = JSON.stringify(musicData);
      console.log("stringified musicData", musicData);
      addMusic.addMusic(musicData);
    });

  
  $("#filter").on("click", function(){
    var selectedArtist = $("#selectedArtist").val();
    var selectedAlbum = $("#selectedAlbum").val();
    console.log("selectedArtist", selectedArtist, "selectedAlbum", selectedAlbum);
      filter2 (selectedArtist, selectedAlbum);
    });
    
});


  function hideSong() {
    var songToDelete = $(this).parent();
    songToDelete.hide().html();
    console.log("hideSong called" + "songtoDelete = " + songToDelete);
  }

  function filterSongs(a, b) {
    var arrayOfArtists = [];
    _.findKey(allSongsArray[0], function(artist) {
      arrayOfArtists.push(artist.artist);
    });
    var arrayOfAlbums = [];
    _.findKey(allSongsArray[0], function(album) {
      arrayOfAlbums.push(album.album);
    });
  
   for (var i = 0; i < arrayOfAlbums.length; i++) {
    if (b !== arrayOfAlbums[i]) {
      $($(".album").parent()[i]).hide();
    } else {
      $($(".album").parent()[i]).show();
    }
   }
  for (var x = 0; i < arrayOfArtists.length; x++) {
    if (x !== arrayOfArtists[x]) {
      $($(".artist").parent()[x]).hide();
    } else {
      $($(".artist").parent()[x]).show();
    }
   }
  }

  function filter2 (selectedartist, selectedalbum) {
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
  

