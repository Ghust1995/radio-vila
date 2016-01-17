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
};
