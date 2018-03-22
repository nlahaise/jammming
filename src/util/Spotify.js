const client_id = 'ab397cdbd2cf4b849ed104d60a49ee18';
const redirect_uri = encodeURI('http://localhost:3000/');
let access_token='';

const Spotify = {
  /*
    function retrieves an access Token
    redirects to spotify api get access_token
    sets value of access_token
    clears window url if access_token has value
   */
  getAccessToken() {
    if(access_token){
      return access_token;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      access_token = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => access_token = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return access_token;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },


  /*
    function runs search with the current term
    returns array of tracks from spotify api
   */
  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=+${term}`,{
      headers: {
        Authorization:`Bearer ${access_token}`
      }
    }).then(response => {
          return response.json();
    }).then(jsonResponse => {

      if(jsonResponse.tracks.items){
        return jsonResponse.tracks.items.filter(track => track.album.images[2])
        .map(track =>({
          id:track.id,
          name:track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          albumArt: track.album.images[2].url,
          uri: track.uri,
          preview: track.preview_url
          }));
      }
    });
  },


  /*
    function saves a playlist on the users spotify account
    returns none
   */
  savePlaylist(playlistName, trackURIs) {

      // stop the function is there isn't a playlist name or any songs in the PlayList
      if(!playlistName || !trackURIs) {
          return;
      }

      // set variable to connect to the spotify api
      let accessToken = this.getAccessToken();
      let headers = {
        Authorization: `Bearer ${accessToken}`
      }


      // get the current users spotify user_id
      return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
          let user_id = jsonResponse.id; //var holds spotify accounts user_id


      // post/create a playlist on the users account
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: playlistName })
          }).then(response => response.json()
          ).then(jsonResponse => {
          let playlist_id = jsonResponse.id; //var holds playlist_id of PlayList just created on spotify account


      // post/add the songs to the playlist that was created in the last step
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackURIs })
          }).then(response => response.json()
          ).then(jsonResponse => {
          });
        })
      });
    }
};

export default Spotify;
