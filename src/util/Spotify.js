let accessToken;
const clientID = "fefb2ab3a63042f2bafc54681cf10d71";
const redirectURI = "http://localhost:3000";

const Spotify = {

    getAccessToken() {
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
              const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
              window.location = accessURL;
                }
        },
     

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
          }).then(response => {
              return response.json();}).then(jsonResponse => {
                  if (!jsonResponse.tracks.items) {
                      return [];
                  }
                  return jsonResponse.tracks.items.map(track => ({
                      id: track.id,
                      name: track.name,
                      artist: track.artists[0].name,
                      album: track.album.name,
                      URI: track.uri
                  }))
              })
          },

          savePlaylist(playlistName, trackURIs) {
              if (!playlistName || !trackURIs.length) {
                  return; 
              }
              const accessToken = Spotify.getAccessToken();
              const headers = { Authorization: `Bearer ${accessToken}`}
              let userID; 
              return fetch('https://api.spotify.com/v1/me', {headers: headers})
              .then(response => response.json())
              .then(jsonResponse =>
                  {userID = jsonResponse.id;
                  return fetch(`https://api.spotify.com//v1/users/${userID}/playlists`,
                  {headers: headers,
                   method: 'POST',
                   body: JSON.stringify({name: playlistName})
                   .then(response => response.json())
                   .then(jsonResponse =>
                    {const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com//v1/users/${userID}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackURIs})
                    });


                    })
                 
                })
                
                  })
              }
          }
    



export default Spotify;