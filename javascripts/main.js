requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs", "addMusic"], 
  function($, Handlebars, bootstrap, dom, populate, get, addMusic) {
  
    $(document).on('click', '.delete', (hideSong));
    
    populate.loadMusic(function(data) {
      // addSongsToDom(data, dom.getOutputElement());
      require(['hbs!../templates/songs'], function(songTemplate) {
      $("#library").prepend(songTemplate(data));
      });
      
      require(['hbs!../templates/albums'], function(formTemplate) {
      $("#album").append(formTemplate(data));
      });

      require(['hbs!../templates/artists'], function(formTemplate) {
      $("#artists").append(formTemplate(data));
      });
    
    });

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

    // $("#more").on('click', function() {
    //   console.log("more button pushsed");
    //   get.moreMusic(function(data) {
    //   //addSongsToDom(data, dom.getOutputElement());
    //   require(['hbs!../templates/songs'], function(songTemplate) {
    //     console.log(songTemplate);
    //   $("#library").append(songTemplate(data));
    //   });
      
    //   require(['hbs!../templates/albums'], function(formTemplate) {
    //   $("#album").append(formTemplate(data));
    //   });

    //   require(['hbs!../templates/artists'], function(formTemplate) {
    //   $("#artists").append(formTemplate(data));
    //   });
  //   });
  

  // });
});


  function hideSong() {
    var songToDelete = $(this).parent();
    songToDelete.hide().html();
    console.log("hideSong called" + "songtoDelete = " + songToDelete);
  }


