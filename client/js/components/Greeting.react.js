var React = require('react');
var PropTypes = React.PropTypes;

var Greeting = React.createClass({

  render: function() {
    return (
      <span className="form-group" style={{marginRight: 30}}>
        Hello, <b>{this.props.username}</b>!
      </span>
    );
  }

});

module.exports = Greeting;
