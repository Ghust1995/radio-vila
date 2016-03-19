import React from 'react';
import UserPanel from './UserPanel.react';
import CurrentSong from './CurrentSong.react';

class NavBar extends React.Component{
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Radio Vila</a>
            <div>
              {this.props.songQueue.name}
            </div>
          </div>
          <div>
            <CurrentSong song={this.props.currentSong} />
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <UserPanel user={this.props.user} />
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
