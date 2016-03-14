import React from 'react';
import _ from 'underscore';

// Material UI
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';

// Components
import SongQueueLine from './SongQueueLine.react';

class SongQueue extends React.Component {
  constructor(props, context) {
      super(props, context);
  }

  render() {
    var sortedQueue = _.sortBy(this.props.songQueue.songs, function(song) { return (-((song.rating * 100000000000000) + song.timeCreated)); });
    var queueElements = _.map(sortedQueue, function(song) {
      return (
          <SongQueueLine
            song={song}
            key={_.uniqueId("s_")} >
          </SongQueueLine>
      );
    });

    return (
      <div className="songQueue col-md-6 col-md-offset-3">
        <Table
            fixedHeader={true}
            showRowRover={true}
            selectable={false}
            >
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn> Song: </TableHeaderColumn>
              <TableHeaderColumn> User: </TableHeaderColumn>
              <TableHeaderColumn> Rating: </TableHeaderColumn>
              <TableHeaderColumn> VOTE! </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queueElements}
          </TableBody>
        </Table>
      </div>
    );
  }

}

export default SongQueue;
