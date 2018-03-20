import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css';

export default class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.updatePlaylistName(event.target);
  }

  render(){
    return(<div className="Playlist">
      <input defaultValue={ this.props.playlistName } onChange={ this.props.onNameChange }/>
        <TrackList track={ this.props.playlistTracks } isRemoval={true} onRemove={ this.props.onRemove }/>
      <a className="Playlist-save" onClick={ this.props.onSave }>SAVE TO SPOTIFY</a>
    </div>
  )};
}
