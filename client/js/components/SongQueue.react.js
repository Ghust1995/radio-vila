var React = require('react');
var _ = require('underscore');

var SongQueueLine = require('./SongQueueLine.react');

var SongQueue = React.createClass({

  render: function() {
    var queueElements = _.mapObject(this.props.songQueue, function(song) {
      return (
        <tr>
          <SongQueueLine
            name={song.name}
            key={song.id}
            user={song.user} >

          </SongQueueLine>
        </tr>
      )
    });

    return (
      <div class="songQueue">
        <table>
          {queueElements}
        </table>
      </div>
    );
  }

});

module.exports = SongQueue;
