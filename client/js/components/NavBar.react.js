var React = require('react');
var UserPanel = require('./UserPanel.react');

var NavBar = React.createClass({

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Radio Vila</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <UserPanel user={this.props.user} />
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = NavBar;
