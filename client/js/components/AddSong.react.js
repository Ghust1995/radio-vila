var React = require('react');

var RadioServerActionCreators = require('../actions/RadioServerActionCreators');

var idcount = 0;

var AddSong = React.createClass({
  getInitialState: function() {
    return {
      songName: '',
    };
  },

  handleSongNameChange: function(e) {
    this.setState({songName: e.target.value})
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var song = {
      id: idcount++,
      user: this.props.username,
      name: this.state.songName,
      rating: 0,
    };

    this.setState({
      songName: '',
    });

    RadioServerActionCreators.addSong(song);
  },

  render: function() {
    return (
      <div className="addNewSongForm">
        <form onSubmit={this.handleSubmit} >
          <input
            type="text"
            placeholder="Add your song here"
            value={this.state.songName}
            onChange={this.handleSongNameChange}
            />
          <input type="submit" value={!this.props.isLoading ? "Submit" : "Loading..."} disabled={this.props.isLoading}/>
        </form>
      </div>
    );
  }

});

module.exports = AddSong;
