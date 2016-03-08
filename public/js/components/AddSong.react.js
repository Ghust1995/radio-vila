var React = require('react');
var _ = require('underscore');

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');

var YoutubePreview = require('./YoutubePreview.react');

var idcount = 0;

var AddSong = React.createClass({
  getInitialState: function() {
    return {
      songName: '',
    };
  },

  handleSongNameChange: function(e) {
    this.setState({songName: e.target.value});
    RadioViewActionCreator.searchYoutube(this.state.songName);
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

    var previews = _.map(this.props.searchResults, function(r) {
      return (
        <YoutubePreview snippet={r.snippet} key={_.uniqueId("youtube_")}></YoutubePreview>
      )
    });

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
        {previews}
      </div>
    );
  }

});

module.exports = AddSong;
