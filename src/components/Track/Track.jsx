import React from 'react';
import styles from './Track.module.css';


function Track({ track, onAdd, onRemove }) {
  return (
    <div className={styles.Track} key={track.id} data-testid="track">
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>{`${track.artist} | ${track.album}`}</p>
      </div>
      <button className={styles.TrackAction} onClick={() => onAdd(track)}>Add</button>
      {onRemove && <button className={styles.TrackAction} onClick={() => onRemove(track)}>Remove</button>}
    </div>
  );
}

export default Track;

