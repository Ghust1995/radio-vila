import React, {PropTypes} from 'react';

// Mateial UI
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import ControlPoint from 'material-ui/lib/svg-icons/image/control-point';
import IconButton from 'material-ui/lib/icon-button';

// Actions
import RadioViewActionCreator from '../actions/RadioViewActionCreator';

class YoutubePreview extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var song = {
      playerInfo:{
        type: 'youtube',
        id: this.props.songData.snippet.id,
      },
      user: this.props.user,
      title: this.props.songData.snippet.title,
    };

    RadioViewActionCreator.addSong(song);
  }

  render() {

    return (
      <div>
        <img src={this.props.songData.snippet.thumbnails.default.url} />
      </div>
    );
  }

}

export default YoutubePreview;
