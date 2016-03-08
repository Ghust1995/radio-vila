var React = require('react');
var PropTypes = React.PropTypes;

var FillableBar = React.createClass({

  render: function() {
    return (
      <div className="progress" style={{width: this.props.width, height: 5}}>
        <div  className="progress-bar progress-bar-striped active"
              role="progressbar"
              aria-valuenow={this.props.fill}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{width: this.props.width*this.props.fill/100}}/>
      </div>
    );
  }

});

module.exports = FillableBar;
