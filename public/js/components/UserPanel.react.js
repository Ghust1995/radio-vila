var React = require('react');
var _ = require('underscore');

var Login = require('./Login.react');
var Logout = require('./Logout.react');
var Greeting = require('./Greeting.react');


var UserPanel = React.createClass({

  render: function() {
    var isUserLogged = _.isEmpty(this.props.user);


    return (
      <div className="navbar-form navbar-right">
        <div
          className="userPanel-logged-in"
          hidden={isUserLogged}>
          <Greeting
            username={this.props.user.name}
            />
          <Logout />
        </div>
        <div>
          <div
            className="userPanel-logged-in"
            hidden={!isUserLogged}>
            <Login />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = UserPanel;
