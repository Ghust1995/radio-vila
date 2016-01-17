var React = require('react');

var SongQueueComponent = React.createClass({

  render: function() {
    return (
      <div class="songElement">
        <td>{this.props.name}</td>
        <td>{this.props.user}</td>
      </div>
    );
  }

});

module.exports = SongQueueComponent;
