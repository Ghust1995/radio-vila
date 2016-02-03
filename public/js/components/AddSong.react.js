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
    var loading = this.props.isLoading;

    return (
      <div className="addNewSongForm col-md-6 col-md-offset-3 text-center">
        <form onSubmit={this.handleSubmit}  className="form-inline">
            <input
              type="text"
              placeholder="Add your song here"
              value={this.state.songName}
              onChange={this.handleSongNameChange}
              className="form-control input-lg"
              />
            <button className={"btn btn-lg btn-" + (!loading ? "success" : "warning") }
                    type="submit"
                    disabled={loading}>
              <span className={"glyphicon glyphicon-" + (!loading ? "plus" : "refresh")}></span>
            </button>
        </form>
      </div>
    );
  }

});

module.exports = AddSong;
