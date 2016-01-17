var React = require('react');
var _ = require('underscore');

var Login = require('./Login.react');
var Greeting = require('./Greeting.react');


var UserPanel = React.createClass({

  render: function() {
    return (
      <div className="userPane">
        <Greeting
          isHidden={_.isEmpty(this.props.user)}
          username={this.props.user.name}
        />
        <Login
          isHidden={!_.isEmpty(this.props.user)} 
        />
      </div>
    );
  }

});

module.exports = UserPanel;
