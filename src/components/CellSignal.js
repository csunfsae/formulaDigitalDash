import React, { Component } from 'react';
import './CellSignal.css';

class CellSignal extends Component {
    render() {
        var signal = {
            borderBottom : `${ 0.01 * this.props.signalStrength }em solid white`,
            top: `${0.01 *(100-this.props.signalStrength) }em`,
            borderLeft: `${(0.01 * this.props.signalStrength) }em solid transparent`,
        }
        return (
            <div className={this.props.className}>
                <p className="m-0">{this.props.signalType}</p>
                <div className='icon'>
                    <div className="background"></div>
                    <div className="cellStrength" style={signal} ></div>
                </div>
            </div>
        );
    }
}

export default CellSignal;
