import React from 'react';
import _ from 'underscore';

// Material UI
import TextField from 'material-ui/lib/text-field';
import GridList from 'material-ui/lib/grid-list/grid-list';

// Actions
import RadioViewActionCreator from '../actions/RadioViewActionCreator';

// Components
import YoutubePreview from './YoutubePreview.react';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class AddSong extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleSongNameChange = this.handleSongNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      songName: '',
    };
  }

  handleSongNameChange(e) {
    this.setState({songName: e.target.value});
    RadioViewActionCreator.searchYoutube(e.target.value);
  }

  handleSubmit(song) {
    this.setState({
      songName: '',
    });
    RadioViewActionCreator.searchYoutube(this.state.songName);
  }

  render() {

    var previews = _.map(this.props.searchResults, function(r) {
      return (
        <YoutubePreview songData={r}
                        key={_.uniqueId("youtube_")}
                        baseHandleSubmit={this.handleSubmit}
                        user={this.props.user}></YoutubePreview>
                    );
    }.bind(this));

    return (
      <div className="addNewSongForm col-md-6 col-md-offset-3 text-center">
        <TextField
          floatingLabelText="Add your song here"
          onChange={this.handleSongNameChange}
          value={this.state.songName}
        />
        <div style={styles.root}>
          {previews}
        </div>
      </div>
    );
  }
}

export default AddSong;
