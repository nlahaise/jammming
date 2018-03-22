import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css';

export default class PlayList extends React.Component {
  constructor(props) {
    super(props);

    // bind this to functions here
    this.handleNameChange = this.handleNameChange.bind(this);
  }


  /*
    function handles the playlist name changes and stores the current value
   */
  handleNameChange(event){
    this.props.updatePlaylistName(event.target);
  }

  // render return
  render(){
    return(<div className="Playlist">
      <input value={ this.props.playlistName }
          onChange={ this.props.onNameChange }/>
        <TrackList track={ this.props.playlistTracks }
          isRemoval={ true }
          onRemove={ this.props.onRemove }/>
      <a className="Playlist-save"
          onClick={ this.props.onSave }>
                SAVE TO SPOTIFY
      </a>
    </div>
  )};
}
