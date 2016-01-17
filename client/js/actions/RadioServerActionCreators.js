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

  userLogin: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGIN,
      user: user
    });

    // Add call to server logic here with callback:
    // USER_LOGIN_SUCCESS in case of success
    // USER_LOGIN_ERROR in case of error

    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      user: user
    });
  },
};
