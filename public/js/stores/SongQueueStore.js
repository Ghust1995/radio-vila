import Dispatcher from '../dispatcher/Dispatcher';
import RadioConstants from '../constants/RadioConstants';
import {EventEmitter} from 'events';
import _ from 'underscore';

import VoteTypes from '../constants/VoteTypes';

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
  let addedSong = _.find(_songQueue.songs, (queuedSong) => queuedSong._id === song.id);
  if(_.isUndefined(addedSong)) {
    _songQueue.songs.push(song);
  }
}

function _setVoteForSong(id, voteType) {
  _.find(_songQueue.songs, (queuedSong) => queuedSong._id === id).voteType = voteType;
}

function _setSongRating(id, rating) {
  _.find(_songQueue.songs, (queuedSong) => queuedSong._id === id).rating = rating;
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
      let song = action.song;
      song.voteType = VoteTypes.UPVOTED;
      song.rating = 1;
      _addSong(song);
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
      let ratedSong = _.find(_songQueue.songs, (song) => song._id === action.id);
      console.log(ratedSong);
      var newRating = ratedSong.rating - ratedSong.voteType + action.voteType;
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
