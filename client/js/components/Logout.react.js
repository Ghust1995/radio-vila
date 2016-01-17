var React = require('react');

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');

var Logout = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    RadioViewActionCreator.userLogout();
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
