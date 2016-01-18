var React = require('react');
var _ = require('underscore');

var SongQueueLine = require('./SongQueueLine.react');

var SongQueue = React.createClass({

  render: function() {
    var sortedQueue = _.sortBy(this.props.songQueue, function(song) {return song.rating })
    var queueElements = _.map(sortedQueue, function(song) {
      return (
          <SongQueueLine
            song={song}
            key={"s_" + song.id.toString()} >
          </SongQueueLine>
      )
    });

    return (
      <div className="songQueue">
        <table>
          <thead>
            <th> Song: </th>
            <th> User: </th>
            <th> Rating: </th>
            <th> VOTE! </th>
          </thead>
          <tbody>
            {queueElements}
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = SongQueue;
