import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function SearchResults({tracks}) {
  // Placeholder data will be replaced with actual data from the Spotify API
  

  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <TrackList tracks={tracks} />
    </div>
  );
}

export default SearchResults;
