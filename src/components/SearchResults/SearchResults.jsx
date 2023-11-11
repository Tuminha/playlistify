import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function SearchResults() {
  // Placeholder data will be replaced with actual data from the Spotify API
  const mockData = []; // Replace with actual data

  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <TrackList tracks={mockData} />
    </div>
  );
}

export default SearchResults;
