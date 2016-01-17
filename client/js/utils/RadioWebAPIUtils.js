var RadioServerActionCreators = require('../actions/RadioServerActionCreators');

module.exports = {

  getSongQueue: function() {
    // simulate retrieving data from a database
    var songQueue = JSON.parse(localStorage.getItem('songQueue'));

    RadioServerActionCreators.receiveAll(songQueue);
  },

  addSong: function(song) {
    // Implement Correct API Call here
    setTimeout(function() {RadioServerActionCreators.addSongSuccess(song);}, 2000);

  },

  userLogin: function(user) {
    // Implement Correct API Call here
    setTimeout(function() {RadioServerActionCreators.userLoginSuccess(user);}, 300);
  },

  userLogout: function(user) {
    // Implement Correct API Call here
    setTimeout(function() {RadioServerActionCreators.userLogoutSuccess(user);}, 100);
  },
};
