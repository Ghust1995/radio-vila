var React = require('react');
var PropTypes = React.PropTypes;

var YoutubePreview = React.createClass({

  render: function() {

    return (
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={this.props.snippet.thumbnails.default.url}></img>
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{this.props.snippet.title}</h4>
          {this.props.snippet.description}
        </div>
      </div>
    );
  }

});

module.exports = YoutubePreview;
