import React from 'react';
import './Track.css';
import Spotify from 'react-icons/lib/fa/spotify';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerVisible:false,
      playerStyle: {
        display: 'none'
      },
    }


    // bind this to functions here
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
  }


  /*
    function calls addOn function in app
    returns none
   */
  addTrack(){
    this.props.addOn(this.props.track);
  }


  /*
    function calls onRemove function in app
    returns none
   */
  removeTrack(){
    this.props.onRemove(this.props.track);
  }


  /*
    function toggles visibility of the preview audio
    returns none
    sets state.playerStyle value
   */
  togglePlayer(){
    this.setState({ playerVisible:!this.state.playerVisible }); //toggle the value of state playerVisible **  true or false  **
    if (this.state.playerVisible){
      this.setState({playerStyle: {display:'none'}});
    }else{
      this.setState({playerStyle: {display:'inline-block'}});
    }
  }


  // render return
  render(){
    const track = this.props.track;

    //test if the track is in the searchResults or the playlist **  + or -  **
    const renderAction = this.props.isRemoval ? (
      <span className='Track-action' onClick={ this.removeTrack } > - </span>
    ) : (
      <span className='Track-action' onClick={ this.addTrack } > + </span>
    )

    //test if the track has a sample preview **  spotify icon on none  **
    const hasPreview = track.preview ? (
      <span className='Track-action' > <Spotify /> </span>
    ) : (
      <span className='Track-action' ></span>
    )

    //test if the track has albumArt **  spotify icon on albumArt image  **
    const hasAlbumArt = track.albumArt ? (
      <img className="albumArt" src={ track.albumArt } width="64px" height="64px" alt={ track.album }/>
    ) : (
      <img className="albumArt" src='spot.png' width="64px" height="64px" alt={ track.album }/>
    )


    //return
    return(
      <div className="Track">
        { hasAlbumArt }
        <div className="Track-information">
          <h3>{ track.name }</h3>
          <p>{ track.artist} | { track.album }</p>
        </div>
        <audio controls="controls" style={this.state.playerStyle}>
            <source src={ this.props.track.preview } type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <a className="Track-action" onClick= { this.togglePlayer } > { hasPreview } </a>
        <a className="Track-action"> { renderAction } </a>
      </div>
    )
  };
}
