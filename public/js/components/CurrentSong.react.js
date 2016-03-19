import React from 'react';

class CurrentSong extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var maxWidth = 500;

    return (
      <div className="nav navbar-nav" style={{marginLeft: 150, textAlign: 'center'}}>
        <h3>{this.props.song.name}</h3>
        <h4>Chosen by: {this.props.song.user}</h4>
      </div>
    );
  }
}

export default CurrentSong;
