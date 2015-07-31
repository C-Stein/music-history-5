requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(dom, populate, get) {
    console.log("populate.getLoadMusic", populate.getLoadMusic());
    addSongsToDom(populate.getLoadMusic(), dom.getOutputElement());

    $("#more").on('click', function() {
      addSongsToDom(get.getMoreMusic(), dom.getOutputElement())
    });
    //dom.getMoreButton().click(get.moreMusic);
    $(document).on('click', '.delete', (hideSong));
  });

  //The main module should then use the return objects from all three 
  //  dependencies to populate your song list.

  function addSongsToDom(list, location) {
    for (var i = 0; i < list.length; i++) {
    var songContent = "<p class='songItem'>";
    songContent += list[i].title;
    songContent +=  " by ";
    songContent += list[i].artist;
    songContent += " on ";
    songContent += list[i].album;
    songContent += " <input type='button' value='delete' class='delete' id='delete" + i + "'>";
    songContent += "</p>";

    location.prepend(songContent);
    }
  }

  function hideSong() {
    var songToDelete = $(this).parent();
    songToDelete.hide().html();
    console.log("hideSong called" + "songtoDelete = " + songToDelete);
  }


