import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify.js';
import './App.css';


export default class App extends React.Component {
  constructor(props){
    super(props);

    // init state values here
    this.state = {
      SearchResults:[],
      playlistName:'New Playlist',
      playlistTracks:[],
    };

    // bind this to functions here
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }



  /*
    function add a track from searchResults to playlist
    returns none
    updates state.playlistTracks
   */
  addTrack(track){
    // set variables
    let trackMatch = false;
    let tempPlaylist = this.state.playlistTracks;

    // loop through the playlist and test in the track
    // being added is already in the playlist
    for(let i=0; i < tempPlaylist.length; i++){
      if(track.id ===   tempPlaylist[i].id){
        trackMatch = true;
      }
    }

    // add the track if it isn't already in the PlayList
    if(!trackMatch){
      tempPlaylist.push(track);
      // update the state with the tempPlaylist
      this.setState({ playlistTracks:tempPlaylist });
    }
  }

  /*
    funtion removes selected track form playlist
    returns none
    updates state.playlistTracks
   */
  removeTrack(track){
    // set variables
    let tempPlaylist = this.state.playlistTracks;

    // loop through the PlayList until a match is found
    // for the track to be removed and remove it
    for(let i=0; i < tempPlaylist.length; i++){
      if(track.id === tempPlaylist[i].id){
        tempPlaylist.splice(i,1);
      }
    }
    // update the state with the tempPlaylist
    this.setState({ playlistTracks:tempPlaylist });
  }


  /*
    function updates the playlist onNameChange
    returns none
    updates state.playlistTracks
   */
  updatePlaylistName(event){
    // update the state with the new PlayList name
    this.setState({ playlistName:event.target.value });
  }


  /*
    function saves playlist to spotify
    returns none
    calls spotify api
   */
  savePlaylist(){
    // new array to hold the uris for each track provided from Spotify
    let trackURIs=[];

    // add each uri to the trackURIs array
    for (let i=0; i < this.state.playlistTracks.length; i++){
      trackURIs.push(this.state.playlistTracks[i].uri);
    }

    // call the savePlaylist function to save the playlist
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {

        // reset the state back to defaults
        this.setState({
          playlistName: "New Playlist",
          playlistTracks: [],
        });
      });
  }


  /*
    function searchs tracks from Spotify
    returns none
    updates state.searchResults
    calls spotify api
   */
  search(term){
    // fetch a token from Spotify and perform the track search
    Spotify.getAccessToken();
    Spotify.search(term).then(searchResults =>{

      // update the state with the searchResults
      this.setState({ SearchResults:searchResults });
    });

  }

  //render return 
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
