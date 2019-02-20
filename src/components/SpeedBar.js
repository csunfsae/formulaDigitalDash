import React, { Component } from 'react';
import './SpeedBar.scss';
import { subscribeToSpeed } from '../api';

class SpeedBar extends Component {
    constructor(props) {
        super(props)
        this.state = { speed: 0}
        subscribeToSpeed((err, data) => this.setState({ speed: data.sats*10 }));
    }
    end() {
        alert("DONE");
    }
    render() {
        let clipping = {
            clip: `rect(0px, ${this.state.speed / 2}rem, 2000px, 0px)`
        }
        return (
            <div className="row speedBar">
                <div className="row speedcurve speedcurve-bg"></div>
                <div className="row speedcurve speed" style={clipping}>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                    <div className="col batterySegment"></div>
                </div>
                <div className="speedcurveblack"></div>
            </div>
        );
    }
}

export default SpeedBar;
