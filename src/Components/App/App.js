import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchBar from '../SearchBar/SearchBar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    { SearchResults: [{name: 'name1', artist: 'artist1', album: 'album1', id: '1'}, 
    {name: 'name2', artist: 'artist2', album: 'album2', id: '2'}, 
    {name: 'name3', artist: 'artist3', album: 'album3', id: '3'}],
      playlistName: 'My Playlist',
      playlistTracks: [{name: 'playlistTracks1', Artist: 'playlistTrack1', album: 'playlistTracks1', id: '4'},
      {name: 'playlistTracks2', Artist: 'playlistTrack2', album: 'playlistTracks2', id: '5'},
      {name: 'playlistTracks3', Artist: 'playlistTrack3', album: 'playlistTracks3', id: '6'}]
  };
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.state({playlistTracks: tracks});
    }
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState( { playlistTracks: tracks})

  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      
        <SearchBar />
        <div className="App-playlist">
        
        <SearchResults searchResults={this.state.SearchResults} onAdd={this.state.addTrack}/>
          
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onChange={this.handleNameChange}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
      </div>
    )
  }
} 

export default App;
