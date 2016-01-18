var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var ActionTypes = RadioConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _songQueue = {};
var _loading = false;

function _toggleLoading() {
  _loading = !_loading;
}

function _addSong(rawSong) {
  _songQueue[rawSong.id] = rawSong;
}

function _rateSong(id, rating) {
  _songQueue[id].rating += rating;
  window.console.log("New Rating for " + _songQueue[id].name + "! Rating is now: " + _songQueue[id].rating);
}

var SongQueueStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSingle: function(id) {
    return _songQueue[id];
  },

  getAll: function() {
    return _songQueue;
  },

  isLoading: function() {
    return _loading;
  }
});

Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_SONGS:
      action.rawSongQueue.forEach(function(rawSong) {
        _addSong(rawSong);
      });
      SongQueueStore.emitChange();
      break;

    case ActionTypes.ADD_SONG:
      _toggleLoading();
      SongQueueStore.emitChange();
      break;

    case ActionTypes.ADD_SONG_SUCCESS:
      _toggleLoading();
      _addSong(action.song);
      SongQueueStore.emitChange();
      break;

    case ActionTypes.RATE_QUEUED_SONG_SUCCESS:
      _rateSong(action.id, action.rating);
      SongQueueStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = SongQueueStore;
