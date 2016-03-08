var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

var ActionTypes = RadioConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _videosMetadata = {};

function _addVideo(videoMetadatum) {
  if(_.isEmpty(_videosMetadata[videoMetadatum.id.videoId])) {
    _videosMetadata[videoMetadatum.id.videoId] = videoMetadatum;
    _videosMetadata[videoMetadatum.id.videoId].id = videoMetadatum.id.videoId;
  }
}

function _clearVideos() {
  _videosMetadata = {};
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
    return _videosMetadata;
  },
});

Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.YOUTUBE_SEARCH:
      youTube.search(action.query, 4, function(error, result) {
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

    default:
      // do nothing
  }

});

module.exports = YoutubeStore;
