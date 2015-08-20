requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '/bower_components/firebase/firebase',
    'lodash': '/bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q'
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
  ["jquery", "lodash", "hbs", "bootstrap", "dom-access", "addMusic", "firebase", "filter", "uniqueLists", "populate-songs", "get-more-songs", "q", "deleteButton", "authentication"], 
  function($, _, Handlebars, bootstrap, dom, addMusic, _firebase, filter, unique, populateSongs, getMoreSongs, Q, deleteButton, auth) {
    

  var ref = new Firebase("https://vivid-heat-717.firebaseio.com");
  var authData = ref.getAuth();

  if (authData === null) {

    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        auth.setUid(authData.uid)
      }
    });
  } else {
      auth.setUid(authData.uid);

  }








    var firstListOfSongs = populateSongs();
    var allSongs = [];
    firstListOfSongs
      .then(function(firstSongs){
        for (var i = 0; i < firstSongs.songs.length; i++) {
          allSongs.push(firstSongs.songs[i]);
        }
        return getMoreSongs();
    })
        .then(function(secondSongs){
          for (var i = 0; i < secondSongs.songs.length; i++) {
          allSongs.push(secondSongs.songs[i]);
        }
        })
      .fail()
      .done();

    var loadedSongs;
    var myFirebaseRef = new Firebase("https://vivid-heat-717.firebaseio.com/");
    //changes your library on the fly when changes happen on firebase
    
    myFirebaseRef.child('songs').on("value", function(snapshot) {
   
      loadedSongs = snapshot.val();
      loadSongs(loadedSongs);

      var uniqueAlbumList = unique.getUniqueAlbumList(snapshot);
      loadAlbumList(uniqueAlbumList);
      
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
    }
      
    function loadAlbumList(data) {
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
    
    console.log("auth.getUid", auth.getUid());
    //grab values from form and store in object
      musicData = {
        "title": $("#addTitle").val(),
        "artist": $("#addArtist").val(),
        "album": $("#addAlbum").val(),
        "uid": auth.getUid()
      };

      musicData = JSON.stringify(musicData);
      console.log("stringified musicData", musicData);
      addMusic(musicData);

      $("#addTitle").val("");
      $("#addArtist").val("");
      $("#addAlbum").val("");
  });

  
  $("#filter").on("click", function(){
    var selectedArtist = $("#selectedArtist").val();
    var selectedAlbum = $("#selectedAlbum").val();
    filter.filterAlbum (selectedAlbum);
    filter.filterArtist (selectedArtist);
  });
    
  $(document).on("click", '.delete', function() {
    var deleteTitle = $(this).siblings('.title').text();
    console.log("deleteTitle", deleteTitle);
    var deleteHash = _.findKey(loadedSongs, {'title': deleteTitle});
    console.log('loadedSongs', loadedSongs);
    
    console.log('deleteHash', deleteHash);


    deleteButton.delete(deleteHash);
  });  


  function hideSong() {
    var songToDelete = $(this).parent();
    songToDelete.hide().html();
    console.log("hideSong called" + "songtoDelete = " + songToDelete);
  }

});


  

