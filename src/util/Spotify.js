let accessToken;
const clientID = "54c53f617a85405aacd3546ec1f744ec";
const redirectURI = "http://localhost:3000/";

const Spotify {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
         const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
          const expiresInMatch = window.location.href/match(/expires_in=([^&]*)/);
          if (accessTokenMatch && expiresInMatch) {
              accessToken = accessTokenMatch[1];
              const expiresIn = Number(expiresInMatch[1]);
              window.setTimeout(() => accessToken = '', expiresIn * 1000);
              window.history.pushState('Access Token', null, '/');
              return accessToken;
          }
          } else {
              const accessURL = `https://accounts.spotify.com/authorize?
              client_id=${clientID}D&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
              windows.location = accessURL;
          }
    }

}

export default Spotify;