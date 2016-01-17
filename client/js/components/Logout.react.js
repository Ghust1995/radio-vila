var React = require('react');

var RadioServerActionCreators = require('../actions/RadioServerActionCreators');

var Logout = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    RadioServerActionCreators.userLogout();
  },
  
  render: function() {
    return (
      <div className="logout">
        <input type="submit" value="Logout" onClick={this.handleSubmit} />
      </div>
    );
  }

});

module.exports = Logout;
