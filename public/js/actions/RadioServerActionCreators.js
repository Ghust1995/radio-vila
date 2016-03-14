var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');

var ActionTypes = RadioConstants.ActionTypes;

module.exports = {
  getSongQueueSuccess: function(songQueue) {
    Dispatcher.dispatch({
      type: ActionTypes.GET_SONG_QUEUE_SUCCESS,
      songQueue: songQueue
    });
  },

  getSongQueueError: function(songQueue) {
    Dispatcher.dispatch({
      type: ActionTypes.GET_SONG_QUEUE_ERROR,
      songQueue: songQueue
    });
  },

  addSongSuccess: function(song) {
      Dispatcher.dispatch({
        type: ActionTypes.ADD_SONG_SUCCESS,
        song: song
      });
  },

  addSongError: function(err) {
      Dispatcher.dispatch({
        type: ActionTypes.ADD_SONG_ERROR,
        error: err,
      });
  },

  voteQueuedSongSuccess: function(id, voteType) {
    Dispatcher.dispatch({
      type: ActionTypes.VOTE_QUEUED_SONG_SUCCESS,
      id: id,
      voteType: voteType,
      rating: rating,
    });
  },

  voteQueuedSongError: function(err) {
    Dispatcher.dispatch({
      type: ActionTypes.VOTE_QUEUED_SONG_ERROR,
      error: err,
    });
  },

  userLoginSuccess: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      user: user,
    });
  },

  userLoginError: function(err) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGIN_ERROR,
      error: err,
    });
  },

  userLogoutSuccess: function(user) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGOUT_SUCCESS,
      user: user,
    });
  },

  userLogoutError: function(err) {
    Dispatcher.dispatch({
      type: ActionTypes.USER_LOGOUT_ERROR,
      err: err,
    });
  },
};
