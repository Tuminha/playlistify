import React from 'react';
import Track from '../Track/Track';
import styles from './TrackList.module.css';



function TrackList({ tracks = [], onRemove, onAdd }) {
  console.log("Rendering TrackList component");
  console.log("TrackList component received tracks: ", tracks); // Added console.log to understand the flow of data
  if (!tracks || tracks.length === 0) {
    return <div>No tracks found. Please try another search.</div>;
  } else {
    return (
      <div className={styles.TrackList} data-testid="track-list">
        {
          tracks.map(track => {
            console.log("Rendering track: ", track); // Added console.log to understand the flow of data
            return <Track key={track.id} track={track} onRemove={onRemove} onAdd={onAdd}/>
          })
        }
      </div>
    );
  }
}

export default TrackList;
