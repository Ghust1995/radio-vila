var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');

var ActionTypes = RadioConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawSongQueue) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_SONGS,
      rawSongQueue: rawSongQueue
    });
  },

  addSong: function(song) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_SONG,
    });

    // Add call to server logic here with callback:
    // ADD_SONG_SUCCESS in case of success
    // ADD_SONG_ERROR in case of error

    setTimeout(function functionName() {
      Dispatcher.dispatch({
        type: ActionTypes.ADD_SONG_SUCCESS,
        song: song
      });
    }, 3000);
  },

  userLogin: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGIN,
    });

    // Add call to server logic here with callback:
    // USER_LOGIN_SUCCESS in case of success
    // USER_LOGIN_ERROR in case of error

    setTimeout(function functionName() {
      Dispatcher.dispatch({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        user: user
      });
    }, 500);
  },

  userLogout: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGOUT,
    });
  },
};
