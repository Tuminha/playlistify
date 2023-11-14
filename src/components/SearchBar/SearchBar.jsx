import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import Spotify from '../../services/Spotify';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchResults = await Spotify.search(searchTerm);
      onSearch(searchResults); // Pass searchResults to parent component
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }



  SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };
  
  return (
    <div className={styles.SearchBar} data-testid="search-bar-container">
      <input data-testid="search-bar-input" placeholder="Enter A Song, Album, or Artist" onChange={handleInputChange} />
      <button className={styles.SearchButton} onClick={handleSearch}>
        {isLoading ? 'LOADING...' : 'SEARCH'}
      </button>
      {/* <SearchResults tracks={results} /> This line is removed as per the instructions */}
    </div>
  );
}

export default SearchBar;