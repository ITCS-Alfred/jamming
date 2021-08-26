import React from 'react';
import TrackList from '../TrackList/TrackList.js';

class PlaySample extends React.Component {
    constructor(props) {
        super(props);
        this.listenToSample = this.listenToSample.bind(this);
    }

}

listenToSample() {
    this.props.TrackList()
}