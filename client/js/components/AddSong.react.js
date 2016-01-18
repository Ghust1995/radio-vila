var React = require('react');

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');

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
      id: (new Date()).getTime(),
      user: this.props.username,
      name: this.state.songName,
      timeCreated: new Date().getTime(),
    };

    this.setState({
      songName: '',
    });

    RadioViewActionCreator.addSong(song);
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
