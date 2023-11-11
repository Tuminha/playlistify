import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import playlistStyles from './components/Playlist/Playlist.module.css';
import styles from './App.module.css';



function App() {
  return (
    <div className={styles.App}>
      <SearchBar />
      <div className={playlistStyles.AppPlaylist}>
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
