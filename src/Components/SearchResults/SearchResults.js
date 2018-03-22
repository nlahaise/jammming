import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

export default class SearchResults extends React.Component{

  // render return
  render(){
    return(<div className="SearchResults">
      <h2>Results</h2>
      <TrackList
          track={ this.props.searchResults }
          addOn={ this.props.addOn }/>
    </div>
  )};
}
