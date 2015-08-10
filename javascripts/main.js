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
  ["jquery", "lodash", "hbs", "bootstrap", "dom-access", "addMusic", "firebase", "filter", "uniqueLists"], 
  function($, _, Handlebars, bootstrap, dom, addMusic, _firebase, filter, unique) {
    var loadedSongs;
    var myFirebaseRef = new Firebase("https://vivid-heat-717.firebaseio.com/");
    //changes your library on the fly when changes happen on firebase
    
    myFirebaseRef.child('songs').on("value", function(snapshot) {
   
      loadedSongs = snapshot.val();
      loadSongs(loadedSongs);
      var uniqueArtistList = unique.getUniqueArtistList(snapshot);
      loadArtistList(uniqueArtistList);
      for (var key in loadedSongs) {
        allSongsArray[allSongsArray.length] = loadedSongs[key];
      }
      console.log("allSongsArray", allSongsArray);

    });



    $(document).on('click', '.delete', (hideSong));
    
    function loadSongs(data) {

      require(['hbs!../templates/songs'], function(songTemplate) {
      $("#library").prepend(songTemplate({songs: data}));
      });
      
      require(['hbs!../templates/albums'], function(formTemplate) {
      $("#selectedAlbum").append(formTemplate({songs: data}));
      });
    }
     
    function loadArtistList(data) {
      require(['hbs!../templates/artists'], function(formTemplate) {
      $("#selectedArtist").append(formTemplate({songs: data}));
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
      $("#addTitle").val("");
      $("#addArtist").val("");
      $("#addAlbum").val("");
  });

  
  $("#filter").on("click", function(){
    var selectedArtist = $("#selectedArtist").val();
    var selectedAlbum = $("#selectedAlbum").val();
      filter.filterSongs (selectedArtist, selectedAlbum);
  });
    


  function hideSong() {
    var songToDelete = $(this).parent();
    songToDelete.hide().html();
    console.log("hideSong called" + "songtoDelete = " + songToDelete);
  }

});


  

