import React from 'react';

// Material UI
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {deepOrange500} from 'material-ui/lib/styles/colors';

// Stores
import SongQueueStore from '../stores/SongQueueStore';
import UserStore from '../stores/UserStore';
import CurrentSongStore from '../stores/CurrentSongStore';
import YoutubeStore from '../stores/YoutubeStore';

// Components
import SongQueue from './SongQueue.react';
import NavBar from './NavBar.react';
import AddSong from './AddSong.react';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

function getState() {
  return {
    songQueue: SongQueueStore.getAll(),
    isAddingSong: SongQueueStore.isLoading(),
    user: UserStore.get(),
    isUserLogged: UserStore.isLogged(),
    currentSong: CurrentSongStore.get(),
    searchResults: YoutubeStore.get(),
  };
}

class RadioApp extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._onChange = this._onChange.bind(this);

    this.state = getState();
  }

  componentDidMount() {
    SongQueueStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    CurrentSongStore.addChangeListener(this._onChange);
    YoutubeStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SongQueueStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
    CurrentSongStore.removeChangeListener(this._onChange);
    YoutubeStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="radioapp">
          <NavBar user={this.state.user} currentSong={this.state.currentSong} songQueue={this.state.songQueue}/>
          <div hidden={!this.state.isUserLogged} style={{marginTop: 150}}>
            <AddSong user={this.state.user} isLoading={this.state.isAddingSong} searchResults={this.state.searchResults}/>
            <SongQueue songQueue={this.state.songQueue} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  _onChange() {
    this.setState(getState());
  }

}

module.exports = RadioApp;
