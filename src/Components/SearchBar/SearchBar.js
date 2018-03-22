import React from 'react';
import './SearchBar.css';


export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // bind this to functions here
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }


  /*
    function calls app function with current search term as a prop
   */
  search(){
    this.props.onSearch(this.state.term);
  }


  /*
    function runs when the search term is changed
    sets state value
   */
  handleTermChange(event){
    this.setState({ term:event.target.value });
  }


  /*
    function runs when a key is pressed in the search textbox
    if enter key call search function
   */
  handleKeyPress(event){
    if (event.key === 'Enter'){
      this.search();
    }
  }


  // render return
  render(){
    return(
    <div className="SearchBar">
      <input
          id="searchText"
          onChange={ this.handleTermChange }
          onKeyPress={ this.handleKeyPress }
          placeholder="Enter A Song, Album, or Artist" />
      <a id="search" onClick={ this.search }>SEARCH</a>
    </div>
  )};
}
