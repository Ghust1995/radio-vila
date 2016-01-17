var React = require('react');

// Stores
var SongQueueStore = require('../stores/SongQueueStore');
var UserStore = require('../stores/UserStore');

// Components
var SongQueue = require('./SongQueue.react');
var UserPanel = require('./UserPanel.react');
var AddSong = require('./AddSong.react');


function getState() {
  return {
    songQueue: SongQueueStore.getAll(),
    user: UserStore.get(),
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
        <UserPanel user={this.state.user} />
        <SongQueue songQueue={this.state.songQueue} />
        <AddSong username={this.state.user.name} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = RadioApp;
