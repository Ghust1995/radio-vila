import React from 'react';

// Material UI
import IconButton from 'material-ui/lib/icon-button';
import ActionThumbUp from 'material-ui/lib/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/lib/svg-icons/action/thumb-down';
import {red500, greenA200} from 'material-ui/lib/styles/colors';// Actions
import RadioViewActionCreator from '../actions/RadioViewActionCreator';

// Constants
import VoteTypes from '../constants/VoteTypes';


class QueuedVote extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleUpvote() {
    RadioViewActionCreator.voteQueuedSong(this.props.songId, VoteTypes.UPVOTED);
  }

  handleDownvote() {
    RadioViewActionCreator.voteQueuedSong(this.props.songId, VoteTypes.DOWNVOTED);
  }

  handleCancel() {
    RadioViewActionCreator.voteQueuedSong(this.props.songId, VoteTypes.UNVOTED);
  }

  render() {
    var voteType = this.props.voteType;

    return (
      <div className='queuedVoteButtons'>
        <IconButton
          tooltip="Like"
          onClick={voteType == VoteTypes.UPVOTED ? this.handleCancel : this.handleUpvote}
          >
          <ActionThumbUp
            color={voteType == VoteTypes.UPVOTED ? greenA200 : null}
            hoverColor={greenA200}/>
        </IconButton>
        <IconButton
          tooltip="Like"
          onClick={voteType == VoteTypes.DOWNVOTED ? this.handleCancel : this.handleDownvote}>
          >
          <ActionThumbDown
            color={voteType == VoteTypes.DOWNVOTED ? red500 : null}
            hoverColor={red500}/>
        </IconButton>
      </div>
    );
  }
}

module.exports = QueuedVote;
