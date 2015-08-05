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
  ["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, Handlebars, bootstrap, dom, populate, get) {
    
    populate.loadMusic(function(data) {
      // addSongsToDom(data, dom.getOutputElement());
      require(['hbs!../templates/songs'], function(songTemplate) {
      $("#library").prepend(songTemplate(data));
      });
    });

    $("#more").on('click', function() {
      console.log("more button pushsed");
      get.moreMusic(function(data) {
      //addSongsToDom(data, dom.getOutputElement());
      require(['hbs!../templates/songs'], function(songTemplate) {
        console.log(songTemplate);
      $("#library").append(songTemplate(data));

      });
    });
  
    $(document).on('click', '.delete', (hideSong));

  });
});

  //The main module should then use the return objects from all three 
  //  dependencies to populate your song list.

  // function addSongsToDom(list, location) {
  //   for (var i = 0; i < list.length; i++) {
  //   var songContent = "<p class='songItem'>";
  //   songContent += list[i].title;
  //   songContent +=  " by ";
  //   songContent += list[i].artist;
  //   songContent += " on ";
  //   songContent += list[i].album;
  //   songContent += " <input type='button' value='delete' class='delete' id='delete'" + i + "'>";
  //   songContent += "</p>";

  //   location.prepend(songContent);
  //   }
  // }

  function hideSong() {
    var songToDelete = $(this).parent();
    songToDelete.hide().html();
    console.log("hideSong called" + "songtoDelete = " + songToDelete);
  }


