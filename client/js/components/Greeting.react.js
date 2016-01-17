var React = require('react');
var PropTypes = React.PropTypes;

var Greeting = React.createClass({

  render: function() {
    return (
      <div className="userGreeting">
        Hello, <b>{this.props.username}</b>!
      </div>
    );
  }

});

module.exports = Greeting;
