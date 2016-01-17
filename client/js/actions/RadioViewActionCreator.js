var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var RadioWebAPIUtils = require('../utils/RadioWebAPIUtils');

var ActionTypes = RadioConstants.ActionTypes;

module.exports = {

  addSong: function(song) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_SONG,
    });

    RadioWebAPIUtils.addSong(song);
  },

  userLogin: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGIN,
    });

    RadioWebAPIUtils.userLogin(user);
  },

  userLogout: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGOUT,
    });

    RadioWebAPIUtils.userLogout(user);
  },
};
