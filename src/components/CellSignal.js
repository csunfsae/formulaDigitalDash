import React, { Component } from 'react';
import './CellSignal.css';
import { subscribeToGPS } from '../api';

class CellSignal extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         gps:0,
         signalStrength:0,
         signalType:"WIFI"
      }
      subscribeToGPS((err, data) => this.setState({gps: data.sats, signalStrength:data.sats}));
    }
    
    render() {
        var signal = {
            borderBottom : `${ 0.1 * this.state.signalStrength }em solid white`,
            top: `${0.1 *(10-this.state.signalStrength) }em`,
            borderLeft: `${(0.1 * this.state.signalStrength) }em solid transparent`,
        }
        return (
            <div className={this.props.className}>
                <p className="m-0">{this.state.signalType}</p>
                <div className='icon ml-1'>
                    <div className="background"></div>
                    <div className="cellStrength " style={signal} ></div>
                </div>
                <div className={"ml-1 d-inline-block"}><svg height='25px' width="20px" fill="white"><path d="M8,0C4.687,0,2,2.687,2,6c0,3.854,4.321,8.663,5,9.398C7.281,15.703,7.516,16,8,16s0.719-0.297,1-0.602  C9.679,14.663,14,9.854,14,6C14,2.687,11.313,0,8,0z M8,10c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S10.209,10,8,10z M8,4  C6.896,4,6,4.896,6,6s0.896,2,2,2s2-0.896,2-2S9.104,4,8,4z" /></svg></div>
                <p className="m-0">{this.state.gps}</p>
            </div>
        );
    }
}

export default CellSignal;
