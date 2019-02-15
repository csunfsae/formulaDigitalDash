import React, { Component } from 'react';
import './SpeedBar.scss';
import styled , {css} from 'styled-components';

class SpeedBar extends Component {
    render() {
        var Gradient = styled.div`
            clip: rect(0px, ${this.props.speed/2}rem, 2000px, 0px)!important;
            transition: all 5s;
        `;
        return (
            <div className="row speedBar">
                <img style={{position: 'absolute',left: '5px',width: '5em',top: '-10px'}} src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/419.vresize.100.100.high.0.png" />
                <div className="row speedcurve speedcurve-bg"></div>
                <Gradient className="row speedcurve speed">
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
                </Gradient>
                <div className="speedcurveblack"></div>
            </div>
        );
    }
}

export default SpeedBar;
