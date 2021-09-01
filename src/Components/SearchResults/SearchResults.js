import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css';
import App from '../App/App';

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
            <h2>Results</h2>
                 <TrackList tracks={this.props.SearchResults} onAdd={this.props.onAdd} isRemoval={false} />
                 <App preview={this.updatePreviewTrackURI} />
            </div>
        )
    }
}

