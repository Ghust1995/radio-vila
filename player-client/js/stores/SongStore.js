var Dispatcher = require('../dispatcher/Dispatcher');
var PlayerConstants = require('../constants/PLayerConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var ActionTypes = PlayerConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentSong = "";

function changeSong(song) {
  _currentSong = song;
}

function _clearSong() {
  _currentSong = {};
}

var SongStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return _currentSong;
  },
});

Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.REQUEST_SONG_SUCCESS:
      changeSong(action.song);
      SongStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = SongStore;
