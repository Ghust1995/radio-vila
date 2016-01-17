var React = require('react');
var SongQueueStore = require('../stores/SongQueueStore');
var SongQueue = require('./SongQueue.react');


function getState() {
  return {
    songQueue: SongQueueStore.getAll(),
  }
}
var RadioApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    SongQueueStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SongQueueStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="radioapp">
        <SongQueue songQueue={this.state.songQueue} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = RadioApp;
