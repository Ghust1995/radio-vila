var RadioServerActionCreators = require('../actions/RadioServerActionCreators');
var $ = require('jquery');
var _ = require('underscore');

var TEST_SONG_QUEUE_ID = "56e650ee49e1783c19000001";

function logIntoSongQueue(songQueue, user) {
  // TODO: Make multiple songQueues possible
  var socket = io.connect('http://localhost:8080/' + songQueue.id);
  console.log("Connected to io:" + 'http://localhost:8080/' + songQueue.id);
  //$.post('http://localhost/api/songQueues/'  + songQueue.id + /users/, body: {user.name})
  return socket;
}

module.exports = {

  getSongQueue: function(songQueueId) {
    var SongQueue = {};
    $.ajax({
      method: 'GET',
      url:'/api/songQueues/'+ songQueueId,
    })
    .done(function(res) {
      _.extend(SongQueue, res);
      $.ajax({
        method: 'GET',
        url: res.songs.url,
      })
      .done(function(res) {
        _.extend(SongQueue, {songs: res});
        RadioServerActionCreators.getSongQueueSuccess(SongQueue);
      })
      .fail(function(res) {
        console.log("ERROR");
        console.log(res);
      });

    })
    .fail(function(res) {
      console.log("ERROR");
      console.log(res);
    });
  },

  init: function() {
    // TODO: Make multiple songQueues possible and remove this
    //this.getSongQueue();
  },

  addSong: function(song) {
    // Implement Correct API Call here
    $.ajax({
      method: 'POST',
      url:'/api/songqueues/'+ TEST_SONG_QUEUE_ID + '/songs',
      data: song
    })
    .done(function(msg) {
      console.log("Song created");
      console.log(msg);
      RadioServerActionCreators.addSongSuccess(song);
    })
    .fail(function(msg) {
      console.log("ERROR");
      console.log(msg);
    });
  },

  userLogin: function(user) {
    // Implement Correct API Call here
    var songQueue = logIntoSongQueue({id: TEST_SONG_QUEUE_ID});
    songQueue.on('alerta', function(data) {
      console.log("Oie " + data.name);
      songQueue.emit('alerta-cliente', {name: user.name});
      this.getSongQueue(TEST_SONG_QUEUE_ID);
      RadioServerActionCreators.userLoginSuccess(user);
    }.bind(this));
  },

  userLogout: function(user) {
    // Implement Correct API Call here
    setTimeout(function() {RadioServerActionCreators.userLogoutSuccess(user);}, 100);
  },

  voteQueuedSong: function(id, rating) {
    //setTimeout(function() {RadioServerActionCreators.voteQueuedSongSuccess(id, rating);}, 0);
  },
};
