import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify.js';
import './App.css';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      SearchResults:[],
      playlistName:'New Playlist',
      playlistTracks:[],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let trackMatch = false;
    let tempPlaylist = this.state.playlistTracks;
    for(let i=0; i < tempPlaylist.length; i++){
      if(track.id ===   tempPlaylist[i].id){
        trackMatch = true;
      }
    }

    if(!trackMatch){
      tempPlaylist.push(track);
      this.setState({ playlistTracks:tempPlaylist });
    }
  }

  removeTrack(track){
    let tempPlaylist = this.state.playlistTracks;
    for(let i=0; i < tempPlaylist.length; i++){
      if(track.id === tempPlaylist[i].id){
        tempPlaylist.splice(i,1);
      }
    }
    this.setState({ playlistTracks:tempPlaylist });
  }

  updatePlaylistName(event){
    this.setState({ playlistName:event.target.value });
  }

  savePlaylist(){
    let trackURIs=[];
    for (let i=0; i < this.state.playlistTracks.length; i++){
      trackURIs.push(this.state.playlistTracks[i].uri);
    }
    console.log("playlist uris = " + trackURIs);
    console.log("playlist Name is " + this.state.playlistName);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: "New Playlist",
          playlistTracks: [],
        });
      });
  }

  search(term){
    Spotify.getAccessToken();
    Spotify.search(term).then(searchResults =>{
      this.setState({ SearchResults:searchResults });
    });

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
                onSearch={ this.search }/>
          <div className="App-playlist">
            <SearchResults
                searchResults={ this.state.SearchResults }
                addOn={ this.addTrack } />
            <PlayList
                playlistName={ this.state.playlistName }
                playlistTracks={ this.state.playlistTracks }
                onRemove={ this.removeTrack }
                onNameChange={ this.updatePlaylistName }
                onSave={ this.savePlaylist }/>
          </div>
        </div>
      </div>
    );
  }
}
