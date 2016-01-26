var React = require('react');

// Stores
var SongQueueStore = require('../stores/SongQueueStore');
var UserStore = require('../stores/UserStore');

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
  }
}
var RadioApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    SongQueueStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SongQueueStore.removeChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="radioapp">
        <NavBar user={this.state.user} />
        <div hidden={!this.state.isUserLogged} style={{marginTop: 100}}>
          <AddSong username={this.state.user.name} isLoading={this.state.isAddingSong}/>
          <SongQueue songQueue={this.state.songQueue} />
        </div>::after
      </div>
    );
  },

  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = RadioApp;
