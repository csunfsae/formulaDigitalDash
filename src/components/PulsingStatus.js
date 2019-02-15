import React, { Component } from 'react';
import './PulsatingDot.css'

class PulsatingDot extends Component {
    render() {
        return (
        <div className={this.props.className}>
            <div className={`pulsatingDot ${this.props.status?'online':false}`} />
        </div>
        );
    }
}

export default PulsatingDot;