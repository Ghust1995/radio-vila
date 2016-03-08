var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var RadioWebAPIUtils = require('../utils/RadioWebAPIUtils');

var ActionTypes = RadioConstants.ActionTypes;

module.exports = {

  addSong: function(song) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_SONG,
      song: song
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

  voteQueuedSong: function(id, voteType) {
    Dispatcher.dispatch({
      type: ActionTypes.VOTE_QUEUED_SONG,
      id: id,
      voteType: voteType,
    });

    RadioWebAPIUtils.voteQueuedSong(id, voteType);
  },

  searchYoutube: function(query) {
    Dispatcher.dispatch({
      type: ActionTypes.YOUTUBE_SEARCH,
      query: query,
    });
  },
  
};
