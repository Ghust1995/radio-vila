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
    RadioViewActionCreator.searchYoutube(e.target.value);
  },

  handleSubmit: function(song) {
    this.setState({
      songName: '',
    });
    RadioViewActionCreator.searchYoutube(this.state.songName);
  },

  render: function() {

    var previews = _.map(this.props.searchResults, function(r) {
      return (
        <YoutubePreview songData={r}
                        key={_.uniqueId("youtube_")}
                        baseHandleSubmit={this.handleSubmit}
                        user={this.props.user}></YoutubePreview>
                    );
    }.bind(this));

    return (
      <div className="addNewSongForm col-md-6 col-md-offset-3 text-center">
        <input
          type="text"
          placeholder="Add your song here"
          value={this.state.songName}
          onChange={this.handleSongNameChange}
          className="form-control input-lg"
          />
        {previews}
      </div>
    );
  }

});

module.exports = AddSong;
