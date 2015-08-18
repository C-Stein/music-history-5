// The get-more-songs file should contain the AJAX call to your second JSON 
// file with songs in it. This module should return the array of songs


define(["jquery", "q"], function($, Q) {
  
  return function(){

    var deferred = Q.defer();

    
      $.ajax({
      url:"./javascripts/moreSongs.json"
      }).done(function(data){
        deferred.resolve(data);
      }).fail(function(xhr, status, error){
        deferred.reject(error);
      });

      return deferred.promise;

  };
});