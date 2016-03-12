var React = require('react');
var PropTypes = React.PropTypes;

var PlayerViewActionCreator = require('../actions/PlayerViewActionCreator');

var ReactPlayer = require("react-player");

var Player = React.createClass({
  getInitialState: function() {
    return {
      playing: false,
    };
  },

  onEnded: function() {
    console.log("Ended");
    PlayerViewActionCreator.requestSong();
    this.setState({
      playing: true,
    });
  },

  onPlay : function() {
    console.log("Play!");
  },

  onPlayButton: function(e) {
    e.preventDefault();
    this.setState({
      playing: true,
    });
    //PlayerViewActionCreator.requestSong();
  },

  render: function() {
    return (
      <div>
        Playing: {this.props.song}
        <button onClick={this.onPlayButton}>PLAY</button>
        <ReactPlayer  url={this.props.song}
                      playing={this.state.playing}
                      onEnded={this.onEnded}
                      onPlay={this.onPlay} ></ReactPlayer>
        ----- End
      </div>
    );
  }

});

module.exports = Player;
