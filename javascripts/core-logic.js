define(function(require) {
  var $ = require("jquery");
  var _ = require("lodash");
  var hbs = require("hbs");
  var firebase = require("firebase");
  var addMusic = require("addMusic");
  var auth = require("authentication");
  var unique = require("es6!uniqueLists");
  var deleteButton = require("deleteButton");
  var filter = require("filter");
  // // var getUniqueAlbumList = require("unique").getUniqueAlbumList;
  // var getUniqueArtistList = require("es6!uniqueLists").getUniqueArtistList;

    var currentUser = auth.getUid();
    var loadedSongs;
    var myFirebaseRef = new Firebase("https://vivid-heat-717.firebaseio.com/");
    //changes your library on the fly when changes happen on firebase
    

    console.log("getUniqueArtistList", unique.uniqueAlbum);

    myFirebaseRef.child('songs').orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {
   
      loadedSongs = snapshot.val();
      loadSongs(loadedSongs);

      var uniqueAlbumList = unique.uniqueAlbum(snapshot);
      loadAlbumList(uniqueAlbumList);
      
      var uniqueArtistList = unique.uniqueArtists(snapshot);
      loadArtistList(uniqueArtistList);

      for (var key in loadedSongs) {
        allSongsArray[allSongsArray.length] = loadedSongs[key];
      }
      console.log("allSongsArray", allSongsArray);

    });

    
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
    filter.filterAlbum(selectedAlbum);
    filter.filterArtist(selectedArtist);
  });
    
  $(document).on("click", '.delete', function() {
    var deleteTitle = $(this).siblings('.title').text();
    console.log("deleteTitle", deleteTitle);
    var deleteHash = _.findKey(loadedSongs, {'title': deleteTitle});
    deleteButton.delete(deleteHash);
  });  


});