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

    // TODO: make this more reusable
    var upVoteStyle = {
      height: 30,
      width: 30,
      color: voteType == VoteTypes.UPVOTED ? '#20be22' : '',
      backgroundColor: 'transparent',
      border: null,
      outline: 0
    }

    var downVoteStyle = {
      height: 30,
      width: 30,
      color: voteType == VoteTypes.DOWNVOTED ? '#d52626' : '',
      backgroundColor: 'transparent',
      border: null,
      outline: 0
    }

    return (
      <div className='queuedVoteButtons'>
        <button
          className='btn btn-lg'
          onClick={voteType == VoteTypes.UPVOTED ? this.handleCancel : this.handleUpvote}
          style={upVoteStyle} >
          <span className="glyphicon glyphicon-thumbs-up"></span>
        </button>
        <button
          className='btn btn-lg'
          onClick={voteType == VoteTypes.DOWNVOTED ? this.handleCancel : this.handleDownvote}
          style={downVoteStyle} >
          <span className="glyphicon glyphicon-thumbs-down"></span>
        </button>
      </div>
    );
  }
});

module.exports = QueuedVote;
