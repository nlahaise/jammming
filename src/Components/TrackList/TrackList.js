import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

export default class TrackList extends React.Component {

  // render return 
  render(){
    return(
      <div className="TrackList">
        {
          this.props.track.map(track =>{
            return <Track key={ track.id }
            track={ track }
            addOn={ this.props.addOn }
            onRemove={ this.props.onRemove }
            isRemoval={ this.props.isRemoval }  />
          })
        }

      </div>
    )
  };
}
