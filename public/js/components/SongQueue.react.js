var React = require('react');
var _ = require('underscore');

var SongQueueLine = require('./SongQueueLine.react');

var SongQueue = React.createClass({

  render: function() {
    var sortedQueue = _.sortBy(this.props.songQueue, function(song) { return (-((song.rating * 100000000000000) + song.timeCreated)); })
    var queueElements = _.map(sortedQueue, function(song) {
      return (
          <SongQueueLine
            song={song}
            key={_.uniqueId("s_")} >
          </SongQueueLine>
      )
    });

    return (
      <div className="songQueue col-md-6 col-md-offset-3">
        <table className="table">
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
