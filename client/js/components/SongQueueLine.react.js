var React = require('react');

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');

var SongQueueComponent = React.createClass({

  handleUpvote: function() {
    RadioViewActionCreator.rateQueuedSong(this.props.id, +1);
  },

  handleDownvote: function() {
    RadioViewActionCreator.rateQueuedSong(this.props.id, -1);
  },

  render: function() {
    return (
      <tr className="songElement">
        <td>{this.props.name}</td>
        <td>{this.props.user}</td>
        <td>
          <button className="btn-upvote"  onClick={this.handleUpvote}>
            Upvote!
          </button>
          <button className="btn-downvote"  onClick={this.handleDownvote}>
            Downvote!
          </button>
        </td>
      </tr>
    );
  }

});

module.exports = SongQueueComponent;
