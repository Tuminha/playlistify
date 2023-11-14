import React from 'react';
import PropTypes from 'prop-types';
import Track from '../Track/Track';
import styles from './SearchResults.module.css';


function SearchResults({ tracks = [], onAdd }) {
  // Check if tracks prop is received and is an array
  if (!Array.isArray(tracks)) {
    console.error('Invalid prop: tracks should be an array');
    return null;
  }

  SearchResults.propTypes = {
    tracks: PropTypes.array,
    onAdd: PropTypes.func.isRequired,
  };

  // Render a Track component for each search result
  return (
    <div className={styles.SearchResults}>
      {tracks.map(track => (
        <Track key={track.id} track={track} onAdd={onAdd} />
      ))}
    </div>
  );
}



export default SearchResults;