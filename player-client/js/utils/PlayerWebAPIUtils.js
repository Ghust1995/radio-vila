var PlayerServerActionCreators = require('../actions/PlayerServerActionCreators');
var $ = require('jquery');

var i = 0;

module.exports = {
  requestSong: function() {

    // TODO: make calls to real API
    // DELETE .../songs/{currentSongID}
    // GET    .../songs[0]
    // POST   .../currentSong  song

    var songs = ['https://www.youtube.com/watch?v=a1Y73sPHKxw', 'https://www.youtube.com/watch?v=2D8oUY6bkdA', "https://www.youtube.com/watch?v=4zLfCnGVeL4", 'https://www.youtube.com/watch?v=oUFJJNQGwhk'];
    PlayerServerActionCreators.requestSongSuccess(songs[i]);
    i = (i + 1) % songs.length;
    console.log(i);
  },

  init: function() {
    this.requestSong();
  },
};
