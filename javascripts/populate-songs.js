// //The populate-songs file should contain the AJAX call to your first JSON file 
// // ith songs in it. This module should return the array of songs.


define(["jquery", "q"], function($, Q) {

  return function() {  
    var deferred = Q.defer();
  
 


      $.ajax({
      url:"./javascripts/songs.json"
      }).done(function(data){
        deferred.resolve(data);
      })
      .fail(function (xhr, status, error){
        deferred.reject(error);
      });
    
  

  return deferred.promise;
  };
});