var React = require('react');

// Stores
var SongQueueStore = require('../stores/SongQueueStore');
var UserStore = require('../stores/UserStore');
var CurrentSongStore = require('../stores/CurrentSongStore');
var YoutubeStore = require('../stores/YoutubeStore');

// Components
var SongQueue = require('./SongQueue.react');
var NavBar = require('./NavBar.react');
var AddSong = require('./AddSong.react');


function getState() {
  return {
    songQueue: SongQueueStore.getAll(),
    isAddingSong: SongQueueStore.isLoading(),
    user: UserStore.get(),
    isUserLogged: UserStore.isLogged(),
    currentSong: CurrentSongStore.get(),
    searchResults: YoutubeStore.get(),
  };
}
var RadioApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    SongQueueStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    CurrentSongStore.addChangeListener(this._onChange);
    YoutubeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SongQueueStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
    CurrentSongStore.removeChangeListener(this._onChange);
    YoutubeStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="radioapp">
        <NavBar user={this.state.user} currentSong={this.state.currentSong}/>
        <div hidden={!this.state.isUserLogged} style={{marginTop: 150}}>
          <AddSong username={this.state.user.name} isLoading={this.state.isAddingSong} searchResults={this.state.searchResults}/>
          <SongQueue songQueue={this.state.songQueue} />
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = RadioApp;
