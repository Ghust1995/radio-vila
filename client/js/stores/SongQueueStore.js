var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var ActionTypes = RadioConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _songQueue = {};

function _addSongs(rawSongs) {
  _songQueue = rawSongs;
}

var SongQueueStore = assign({}, EventEmitter.prototype, {

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
});

SongQueueStore.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_SONGS:
      _addSongs(action.rawSongQueue);
      SongQueueStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = SongQueueStore;
