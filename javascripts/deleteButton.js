
define(["firebase"],function(_firebase) {

 return {
   delete: function(argument) {
     var ref = new Firebase("https://vivid-heat-717.firebaseio.com/songs/" + argument);
     ref.remove();
     console.log("ref", argument);
   }
 };

}); 