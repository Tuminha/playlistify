import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Track from './components/Track/Track';
import TrackList from './components/TrackList/TrackList';
import Spotify from './services/Spotify';



const mockTracks = [
  { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1" },
  // Add more track objects here
];

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    json: () => Promise.resolve({
      tracks: {
        items: [
          {
            id: '1',
            name: 'Track 1',
            artists: [{ name: 'Artist 1' }],
            album: { name: 'Album 1' },
            uri: 'uri1'
          },
          // Add more track objects here
          {
            id: '2',
            name: 'Track 2',
            artists: [{ name: 'Artist 2' }],
            album: { name: 'Album 2' },
            uri: 'uri2'
          },
          {
            id: '3',
            name: 'Track 3',
            artists: [{ name: 'Artist 3' }],
            album: { name: 'Album 3' },
            uri: 'uri3'
          }
        ]
      }
    })
  });
});




/* Test to verify that the SearchResults component renders a list of Track components:

Render the SearchResults with a mock array of tracks.
Check that for each track object, a Track component is rendered.
Test to ensure that each Track component receives the correct props:

Render the TrackList with a mock array of tracks.
For each Track component, check that it has received the correct track data as props.
Test to confirm the unique key for each Track component:

Render the SearchResults component.
Verify that each Track component has a unique key prop. */

describe('SearchResults', () => {
  test('renders a list of Track components', () => {
    render(<SearchResults tracks={mockTracks} />);
    const trackElements = screen.getAllByTestId('track');
    expect(trackElements.length).toBe(mockTracks.length);
  });

  test('each Track component receives the correct props', () => {
    render(<TrackList tracks={mockTracks} />);
    const trackElements = screen.getAllByTestId('track');
    trackElements.forEach((trackElement, index) => {
      expect(trackElement).toHaveTextContent(mockTracks[index].name);
      expect(trackElement).toHaveTextContent(mockTracks[index].artist);
      expect(trackElement).toHaveTextContent(mockTracks[index].album);
    });
  });

  test('each Track component has a unique key prop', () => {
    render(<SearchResults tracks={mockTracks} />);
    const trackElements = screen.getAllByTestId('track');
    const keyValues = trackElements.map(trackElement => trackElement.getAttribute('key'));
    const keySet = new Set(keyValues);
    expect(keyValues.length).toBe(keySet.size);
  });
} );

test('renders Playlist component with correct props', () => {
  render(<App />);
  const playlistElement = screen.getByTestId('playlist');
  expect(playlistElement).toBeInTheDocument();
  // Add more assertions here
});

// App.test.js
test('renders TrackList component with correct props', async () => {
  render(<Playlist playlistName="My Playlist" playlistTracks={ mockTracks } />);
  const trackListElement = await screen.findByTestId('track-list');
  expect(trackListElement).toBeInTheDocument();
  // Add more assertions here
});

test('renders a Track component for each track', () => {
  render(<TrackList tracks={ mockTracks } />);
  const trackElements = screen.getAllByTestId('track');
  expect(trackElements.length).toBe(mockTracks.length);
});







test('adds a track to the playlist when the "Add" button is clicked', async () => {
  render(<App />);

  // Simulate a search
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();
  const mockTrack = { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1", uri: "spotify:track:1" };
  

  // Now the 'Add' buttons should be in the document
  render(<Track track={mockTrack} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

  fireEvent.click(screen.getByText('Add'));

  expect(mockOnAdd).toHaveBeenCalledWith(mockTrack);



});


test('removes a track from the playlist when the "Remove" button is clicked', async () => {
  render(<App />);
  
  // Simulate a search
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();
  const mockTrack = { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1", uri: "spotify:track:1" };
  
  // Now the 'Remove' buttons should be in the document
  render(<Track track={mockTrack} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

  fireEvent.click(screen.getByText('Remove'));

  expect(mockOnRemove).toHaveBeenCalledWith(mockTrack);

});


test('allows the user to change the playlist name', () => {
  const mockOnNameChange = jest.fn();
  render(<Playlist playlistTracks={[]} onNameChange={mockOnNameChange} />);

  // Find the input field and type a new name into it
  const nameInput = screen.getByRole('textbox');
  fireEvent.change(nameInput, { target: { value: 'New Playlist Name' } });

  // Check if the input field now has the new name
  expect(nameInput.value).toBe('New Playlist Name');

  // Check if the onNameChange function was called with the new name
  expect(mockOnNameChange).toHaveBeenCalledWith('New Playlist Name');
});

test('saves the playlist to the user\'s Spotify account', () => {
  const mockTracks = [
    { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1", uri: "spotify:track:1" },
    // Add more track objects here
  ];
  const mockOnNameChange = jest.fn();
  const mockOnRemove = jest.fn();

  render(<Playlist playlistTracks={mockTracks} onNameChange={mockOnNameChange} onRemove={mockOnRemove} />);

  // Click the "SAVE TO SPOTIFY" button
  const saveButton = screen.getByText('SAVE TO SPOTIFY');
  fireEvent.click(saveButton);

  // Check if the onNameChange function was called with an empty string
  expect(mockOnNameChange).toHaveBeenCalledWith('');

  // Check if the onRemove function was called with the playlist tracks
  expect(mockOnRemove).toHaveBeenCalledWith(mockTracks);
});




describe('Spotify service', () => {
  beforeEach(() => {
    // Reset the access token before each test
    Spotify.setAccessToken(null);
  });

  it('should set and get access token correctly', () => {
    const testToken = 'test-token';
    Spotify.setAccessToken(testToken);
    expect(Spotify.getAccessToken()).toBe(testToken);
  });

  it('should return search results', async () => {
    // Log the fetch mock to see if it's being called and what it's returning
    console.log('fetch mock:', global.fetch);
  
    const results = await Spotify.search('test');
  
    // Log the results to see what's being returned
    console.log('results:', results);
  
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
    // Add more assertions based on your mock track data
  });
});