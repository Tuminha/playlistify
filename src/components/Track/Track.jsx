import React from 'react';
import styles from './Track.module.css';

function Track({ track }) {
  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className={styles.TrackAction}> {/* Will be + or - depending on whether the track is in the playlist */} </button>
    </div>
  );
}

export default Track;
