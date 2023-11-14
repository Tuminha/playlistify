let accessToken;
const clientId = '';
const clientSecret = '';
const redirectUri = 'http://localhost:3002/';

const Spotify = {
  getAccessToken() {
    console.log('Getting access token:', accessToken);
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      if (process.env.NODE_ENV === 'test') {
        return url;
      } else {
        window.location = url;
      }
    }
  },
  setAccessToken(token) {
    console.log('Setting access token:', token);
    accessToken = token;
  },
  async search(term) {
    const accessToken = this.getAccessToken();
    let response;
    try {
      response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      return [];
    }
    if (!response) {
      console.error(`No response received.`);
      return [];
    }
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    } else {
      let jsonResponse;
      try {
        jsonResponse = await response.json();
      } catch (error) {
        console.error(`Response parsing error: ${error}`);
        return [];
      }
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }
  },
  // other methods to interact with Spotify API...
};

export default Spotify;

