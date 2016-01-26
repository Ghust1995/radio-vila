var React = require('react');

var RadioViewActionCreator = require('../actions/RadioViewActionCreator');

var Logout = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    RadioViewActionCreator.userLogout();
  },

  render: function() {
    return (
      <div className="form-group">
        <button type="submit" className="btn btn-danger" onClick={this.handleSubmit} >Logout</button>
      </div>
    );
  }

});

module.exports = Logout;
