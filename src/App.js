import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import playlistStyles from './components/Playlist/Playlist.module.css';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [tracks, setTracks] = useState([
    { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Track 2", artist: "Artist 2", album: "Album 2" },
    // ... more tracks
  ]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Function to update playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Function to add track to playlist
  const addToPlaylist = (track) => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
      removeFromPlaylist(track);
    }
  };

  const removeFromPlaylist = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(t => t.id !== track.id));
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className={styles.App} data-testid="app">
      <SearchBar onSearch={setSearchResults} />
      <div className={playlistStyles.AppPlaylist}>
        <SearchResults tracks={searchResults} onAdd={addToPlaylist} />
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onNameChange={updatePlaylistName} onRemove={removeFromPlaylist} />
      </div>
    </div>
  );
}

export default App;

