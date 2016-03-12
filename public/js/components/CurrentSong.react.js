var React = require('react');
var FillableBar = require('./FillableBar.react');

var CurrentSong = React.createClass({
  render: function() {

    var progress = (this.props.song.elapsed.min * 60 + this.props.song.elapsed.sec) / (this.props.song.duration.min * 60 + this.props.song.duration.sec);
    progress *= 100;
    progress = progress >> 0;

    var maxWidth = 500;

    return (
      <div className="nav navbar-nav" style={{marginLeft: 150, textAlign: 'center'}}>
        <h3>{this.props.song.name}, chosen by: {this.props.song.user}</h3>
        <ul className="list-inline" style={{height: 25}}>
          <li>
            {this.props.song.elapsed.min}:{(this.props.song.elapsed.sec < 10 ? "0" : "") + this.props.song.elapsed.sec}
          </li>
          <li>
            <FillableBar fill={progress} width={maxWidth}></FillableBar>
          </li>
          <li>
            -{this.props.song.duration.min}:{this.props.song.duration.sec}
          </li>
        </ul>
      </div>
    );
  },
});

module.exports = CurrentSong;
