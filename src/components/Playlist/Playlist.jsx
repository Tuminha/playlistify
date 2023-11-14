import React, { useState } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.module.css';

function Playlist({ playlistName = '', playlistTracks, onRemove, onNameChange, onAdd }) {
  console.log("Rendering Playlist component");
  
  // Use the playlistTracks prop to pass down to the TrackList component
  const tracks = playlistTracks;
  console.log("Tracks in Playlist: ", tracks);

  // Check if the track's name is being rendered as 'Track 1'
  tracks.forEach(track => {
    if (track.name !== 'Track 1') {
      console.error(`Track name is not being rendered as 'Track 1': ${track.name}`);
    }
  });

  // Use useState to manage the playlist name in the local state
  const [currentPlaylistName, setCurrentPlaylistName] = useState(playlistName);

  // Handle the change of the playlist name
  const handleNameChange = (event) => {
    setCurrentPlaylistName(event.target.value);
    onNameChange(event.target.value);
  };

  // Create an array of URIs for each track in the playlist
  const trackURIs = tracks.map(track => track.uri);

  // Function to save these URIs to the user's Spotify account
  const savePlaylist = () => {
    console.log("Saving playlist to Spotify: ", trackURIs);
    // Reset the playlist in the app
    setCurrentPlaylistName('');
    onNameChange('');
    onRemove(playlistTracks);
  };

  return (
    <div className="Playlist" data-testid="playlist">
      <input 
        value={currentPlaylistName} 
        className="Playlist-input" 
        placeholder="New Playlist" // Add placeholder text to the input field
        onChange={handleNameChange} // Handle the change of the playlist name
      />
      <TrackList tracks={tracks} onRemove={onRemove} onAdd={onAdd} className="TrackList" data-testid="track-list" />
      <button className="Playlist-save" onClick={savePlaylist}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;