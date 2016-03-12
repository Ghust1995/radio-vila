var Dispatcher = require('../dispatcher/Dispatcher');
var PlayerConstants = require('../constants/PlayerConstants');
var PlayerWebAPIUtils = require('../utils/PlayerWebAPIUtils');

var ActionTypes = PlayerConstants.ActionTypes;

module.exports = {
  requestSong: function() {
      Dispatcher.dispatch({
        type: ActionTypes.REQUEST_SONG,
      });

      PlayerWebAPIUtils.requestSong();
  },
};
