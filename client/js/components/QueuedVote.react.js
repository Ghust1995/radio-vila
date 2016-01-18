var React = require('react');

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');
var VoteTypes = require('../constants/VoteTypes');

var QueuedVote = React.createClass({

  handleUpvote: function() {
    RadioViewActionCreator.voteQueuedSong(this.props.songId, VoteTypes.UPVOTED);
  },

  handleDownvote: function() {
    RadioViewActionCreator.voteQueuedSong(this.props.songId, VoteTypes.DOWNVOTED);
  },

  handleCancel: function() {
    RadioViewActionCreator.voteQueuedSong(this.props.songId, VoteTypes.UNVOTED);
  },

  render: function() {
    var voteType = this.props.voteType;
    return (
      <div className="queuedVoteButtons">
        <button
          className={"btn-upvote" + (voteType == VoteTypes.UPVOTED ? "-selected" : "")}
          onClick={voteType == VoteTypes.UPVOTED ? this.handleCancel : this.handleUpvote} >
          {(voteType == VoteTypes.UPVOTED ? "cancel" : "") + " upvote"}
        </button>
        <button
          className={"btn-downvote"  + (voteType == VoteTypes.DOWNVOTED ? "-selected" : "")}
          onClick={voteType == VoteTypes.DOWNVOTED ? this.handleCancel : this.handleDownvote} >
          {(voteType == VoteTypes.DOWNVOTED ? "cancel" : "") + " downvote"}
        </button>
      </div>
    );
  }
});

module.exports = QueuedVote;
