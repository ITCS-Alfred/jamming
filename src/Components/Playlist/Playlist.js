import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';
import App from '../App/App';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }


    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} playlistTracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} preview={this.updatePreviewTrackURI}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}