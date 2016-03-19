var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

var ActionTypes = RadioConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _videos = {};

function _addVideo(video) {
  if(_.isEmpty(_videos[video.id.videoId])) {
    _videos[video.id.videoId] = video;
    _videos[video.id.videoId].id = video.id.videoId;
  }
}

function _clearVideos() {
  _videos = {};
}

var YoutubeStore = _.extend({}, EventEmitter.prototype, {

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
    return _videos;
  },
});

Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.YOUTUBE_SEARCH:
      youTube.search(action.query, 8, function(error, result) {
        if (error) {
          console.log(error);
        }
        else {
          _clearVideos();
          _.each(result.items, function(r) {
            _addVideo(r);
          });
        }
      });
      YoutubeStore.emitChange();
      break;

    case ActionTypes.ADD_SONG:
      _clearVideos();
      YoutubeStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = YoutubeStore;
