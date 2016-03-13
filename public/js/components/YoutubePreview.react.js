var React = require('react');
var PropTypes = React.PropTypes;

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');

var YoutubePreview = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var song = {
      playerInfo:{
        type: 'youtube',
        id: this.props.songData.snippet.id,
      },
      user: this.props.user,
      title: this.props.songData.snippet.title,
    };

    RadioViewActionCreator.addSong(song);
  },

  render: function() {

    return (
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={this.props.songData.snippet.thumbnails.default.url}></img>
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{this.props.songData.snippet.title}</h4>
          {this.props.songData.snippet.description}
          <button className="btn btn-lg btn-success"
                  type="submit"
                  onClick={this.handleSubmit}>
            Add to Queue  <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
      </div>
    );
  }

});

module.exports = YoutubePreview;
