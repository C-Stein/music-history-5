// The dom-access modules should return a reference to the DOM element in your 
// HTML that will contain the song list.



define(function() {
  var $library = $("#library");
  var $more = $("#more");
  var $byebye = $(".delete");

  return {
    getOutputElement: function() {
      return $library;
    },
    getMoreButton: function() {
      return $more;
    },
    getDeleteButton: function() {
      return $byebye;
    }
  };
});