var React = require('react');

var QueuedVote = require('./QueuedVote.react');

var VoteTypes = require('../constants/VoteTypes');

var SongQueueComponent = React.createClass({
  render: function() {
    return (
      <tr className="songElement">
        <td>{this.props.song.name}</td>
        <td>{this.props.song.user}</td>
        <td>{this.props.song.rating}</td>
        <td>
          <QueuedVote songId={this.props.song.id} voteType={this.props.song.voteType}/>
        </td>
      </tr>
    );
  }

});

module.exports = SongQueueComponent;
