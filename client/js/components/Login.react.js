var React = require('react');

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');


var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
    };
  },

  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var user = {
      name: this.state.username,
      password: this.state.password,
    };

    this.setState({
      password: '',
    });

    RadioViewActionCreator.userLogin(user);
  },

  render: function() {
    return (
      <div className="loginForm" hidden={this.props.isHidden}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            />
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }

});

module.exports = Login;
