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
    });


    $(document).on('click', '.delete', (hideSong));
    
    function loadSongs(data) {
      console.log("loadSongs called");

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


      filterSongs($(".artist"), selectedArtist);
      filterSongs($(".album"), selectedAlbum);
    });
    
});


  function hideSong() {
    var songToDelete = $(this).parent();
    songToDelete.hide().html();
    console.log("hideSong called" + "songtoDelete = " + songToDelete);
  }

  function filterSongs(filterBy, selectedItem) {
    filterBy.each(function(index, value) {
      var currentArtist = $(value).html();
      var currentArtistParent = $(value);
      console.log(currentArtist);
      if (currentArtist !== selectedItem) {
        $(currentArtistParent).parent().hide();
        //$('.match-height').matchHeight();
      } else {
        $(currentArtistParent).parent().show();
        $(currentArtistParent).parent().next().show();
        //$('.match-height').matchHeight();
      }
    });
  }

  

