var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var VoteTypes = require('../constants/VoteTypes');

var ActionTypes = RadioConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _songQueue = {};
var _loading = false;

function _toggleLoading() {
  _loading = !_loading;
}

function _setSongQueue(songQueue) {
  _songQueue = songQueue;
}

function _addSong(song) {
  if(_.isEmpty(_songQueue.songs[song.id])) {
    _songQueue.songs[song.id] = song;
  }
}

function _setVoteForSong(id, voteType) {
  _songQueue.songs[id].voteType = voteType;
}

function _setSongRating(id, rating) {
  _songQueue.songs[id].rating = rating;
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

    case ActionTypes.GET_SONG_QUEUE_SUCCESS:
      console.log('SUCCESS');
      _setSongQueue(action.songQueue);
      SongQueueStore.emitChange();
      break;

    case ActionTypes.ADD_SONG:
      _toggleLoading();
      var song = action.song;
      song.voteType = VoteTypes.UPVOTED;
      song.rating = 1;
      _addSong(song);
      console.log(_songQueue);
      SongQueueStore.emitChange();
      break;

    case ActionTypes.ADD_SONG_SUCCESS:
      _toggleLoading();
      _addSong(action.song);
      SongQueueStore.emitChange();
      break;

    case ActionTypes.ADD_SONG_ERROR:
      _toggleLoading();
      _removeSong(action.song);
      SongQueueStore.emitChange();
      break;

    case ActionTypes.VOTE_QUEUED_SONG:
      var newRating = _songQueue.songs[action.id].rating - _songQueue.songs[action.id].voteType + action.voteType;
      _setVoteForSong(action.id, action.voteType);
      _setSongRating(action.id, newRating);
      SongQueueStore.emitChange();
      break;

    case ActionTypes.VOTE_QUEUED_SONG_SUCCESS:
      _setVoteForSong(action.id, action.voteType);
      _setSongRating(action.id, action.rating);
      SongQueueStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = SongQueueStore;
