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

    var upVoteStyle = {
      color: 'white',
      backgroundColor: "#20be22",
      backgroundImage: 'img/arrow.png',
      borderStyle: voteType == VoteTypes.UPVOTED ? 'solid' : 'none',
      borderColor: "#285328",
      borderWidth: 5,
    }

    var downVoteStyle = {
      color: 'white',
      backgroundColor: "#d52626",
      backgroundImage: 'img/arrow.png',
      borderStyle: voteType == VoteTypes.DOWNVOTED ? 'solid' : 'none',
      borderColor: "#5e1919",
      borderWidth: 5,
    }

    return (
      <div className="queuedVoteButtons">
        <button
          className={"btn-upvote" + (voteType == VoteTypes.UPVOTED ? "-selected" : "")}
          onClick={voteType == VoteTypes.UPVOTED ? this.handleCancel : this.handleUpvote}
          style={upVoteStyle} >
          upvote
        </button>
        <button
          className={"btn-downvote"  + (voteType == VoteTypes.DOWNVOTED ? "-selected" : "")}
          onClick={voteType == VoteTypes.DOWNVOTED ? this.handleCancel : this.handleDownvote}
          style={downVoteStyle} >
          downvote
        </button>
      </div>
    );
  }
});

module.exports = QueuedVote;
