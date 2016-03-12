var React = require('react');

// Stores
var SongStore = require('../stores/SongStore');

// components
var Player = require('./Player.react');

function getState() {
  return {
    currentSong: SongStore.get(),
  };
}
var PlayerApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    SongStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SongStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="playerapp">
        <Player song={this.state.currentSong}></Player>
      </div>
    );
  },

  _onChange: function() {

    this.setState(getState());
  }

});

module.exports = PlayerApp;
