import React from 'react';

// Material UI
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

// Components
import QueuedVote from './QueuedVote.react';

// Constants
import VoteTypes from '../constants/VoteTypes';


class SongQueueComponent extends React.Component{
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.song.title}</TableRowColumn>
        <TableRowColumn>{this.props.song.user}a</TableRowColumn>
        <TableRowColumn>{this.props.song.rating}b</TableRowColumn>
        <TableRowColumn>
          <QueuedVote songId={this.props.song.id} voteType={this.props.song.voteType}/>
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default SongQueueComponent;
