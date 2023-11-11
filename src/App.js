import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import playlistStyles from './components/Playlist/Playlist.module.css';
import styles from './App.module.css';



function App() {
  // Existing mock state for search result tracks
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Track 2", artist: "Artist 2", album: "Album 2" },
    // ... more tracks
  ]);

  // New mock state for playlist name and tracks
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 3, name: "Track 3", artist: "Artist 3", album: "Album 3" },
    { id: 4, name: "Track 4", artist: "Artist 4", album: "Album 4" },
    // ... more tracks specific to the playlist
  ]);

  return (
    <div className={styles.App}>
      <SearchBar />
      <div className={playlistStyles.AppPlaylist}>
        <SearchResults tracks={searchResults} />
        <Playlist playlistName={playlistName} tracks={playlistTracks} />
      </div>
    </div>
  );
}

export default App;

