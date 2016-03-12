var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var VoteTypes = require('../constants/VoteTypes');

var ActionTypes = RadioConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentSong = {
  id: 1,
  duration:{
    min: 2,
    sec: 55,
  },
  elapsed:{
    min: 0,
    sec: 0,
  },
  user: 'Mut',
  name: 'A rainbow in curved air',
  rating: 0,
  voteType: VoteTypes.UNVOTED,
  timeCreated: new Date().getTime(),
};

function _addTime() {
  _currentSong.elapsed.sec++;
  while(_currentSong.elapsed.sec >= 60) {
    _currentSong.elapsed.min += 1;
    _currentSong.elapsed.sec -= 60;
  }
  CurrentSongStore.emitChange();
}
setInterval(_addTime, 1000);

var CurrentSongStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _currentSong;
  },
});

Dispatcher.register(function(action) {

  switch(action.type) {
    default:
      // do nothing
  }

});

module.exports = CurrentSongStore;
