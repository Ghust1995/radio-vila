var Dispatcher = require('../dispatcher/Dispatcher');
var PlayerConstants = require('../constants/PlayerConstants');

var ActionTypes = PlayerConstants.ActionTypes;

module.exports = {
  requestSongSuccess: function(song) {
      Dispatcher.dispatch({
        type: ActionTypes.REQUEST_SONG_SUCCESS,
        song: song
      });
  },

  requestSongError: function(err) {
      Dispatcher.dispatch({
        type: ActionTypes.REQUEST_SONG_ERROR,
        error: err,
      });
  },
};
