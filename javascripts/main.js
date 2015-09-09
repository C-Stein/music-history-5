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
  ["jquery", "lodash", "hbs", "bootstrap", "addMusic", "firebase", "filter", "uniqueLists", "populate-songs", "q", "deleteButton", "authentication"], 
  function($, _, Handlebars, bootstrap, addMusic, _firebase, filter, unique, populateSongs, Q, deleteButton, auth) {
    

  var ref = new Firebase("https://vivid-heat-717.firebaseio.com");
  var authData = ref.getAuth();

  if (authData === null) {

    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        auth.setUid(authData.uid);
        require(["core-logic"], function() {});
      }
    });
  } else {
      auth.setUid(authData.uid);
      require(["core-logic"], function() {});
  }





});


  

