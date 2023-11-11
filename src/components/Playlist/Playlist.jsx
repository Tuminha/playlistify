import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.module.css';

function Playlist() {
  // Placeholder data will be replaced with actual data from the Spotify API
  const mockData = []; // Replace with actual data

  return (
    <div className="Playlist">
      <input className="Playlist-input" defaultValue={"New Playlist"} />
      <TrackList tracks={mockData} className="TrackList" />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
