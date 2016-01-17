var RadioServerActionCreators = require('../actions/RadioServerActionCreators');

module.exports = {

  getSongQueue: function() {
    // simulate retrieving data from a database
    var songQueue = JSON.parse(localStorage.getItem('songQueue'));

    RadioServerActionCreators.receiveAll(songQueue);
  },

};
