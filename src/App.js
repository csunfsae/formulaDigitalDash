import React, { Component } from 'react';
import './App.scss';
import io from 'socket.io-client';
import PulsatingDot from './components/PulsingStatus';
import Clock from 'react-live-clock';
import CellSignal from './components/CellSignal';
import SpeedBar from './components/SpeedBar';
import { Alert } from 'reactstrap';
import CountUp  from 'react-countup';
import styled from 'styled-components';
import Battery from './components/Battery';
import ReactStopwatch from 'react-stopwatch';

class App extends Component {
  constructor(props) {
    super(props)
    this.socket = io('https://api.matadormotorsports.racing/');
    this.state = { connected: false, charge: 100, signalStrength: 0, signalType: false, mph: 0, batterystart:0};
    
    this.handleConnection = this.handleConnection.bind(this);
    this.something = this.something.bind(this);
  }
  handleConnection(){
    this.setState({
      connected: this.socket.connected,
      signalStrength: this.socket.connected?100:0,
      signalType: this.socket.connected ? 'LTE' : false,
    });
  }
  something(data){
    // this.setState({
    //   // mph: (data.sats*10),
    // });
  }
  componentWillMount() {
    this.socket.on('connect', () => {
      this.handleConnection();
    });
    this.socket.on('reconnecting', () => {
      this.handleConnection();
    });
    this.socket.on('location', (data) =>{
      this.something(data);
    })
  }
  render() {
    return (
      <div>
        <div className="row status-bar d-flex justify-content-end mt-2">
          <PulsatingDot className={"d-block ml-4 mt-2"} status={this.socket.connected} />
          <CellSignal className={"d-block mt-1 ml-2 mr-auto"} signalType={this.state.signalType} signalStrength={this.state.signalStrength} />
          {/* <Alert color="warning" className="mb-0 mr-auto">
            This is a message from the team.
          </Alert> */}
          <div className={"d-block mr-4"}>65℉</div>
          <Clock className={"d-block mr-4"} format={'h:mm A'} ticking={true} timezone={'US/Pacific'} />
        </div>
        <SpeedBar speed={this.state.mph}/>
        <div className="row top-row">
          <div className="speed-border">
            <h3 className="text-left ">MPH:</h3>
            <h1 className="text-center display-2" ><CountUp duration={1} end={this.state.mph} /></h1>
          </div>
          <div className="col-2 text-center ml-auto">
            <h3 className=" text-left">RPM:</h3>
            <h1 className="font-weight-light text-left"><CountUp duration={2} end={10} /></h1>
          </div>
          <div className="col-2 text-center ml-auto">
            <h3 className=" text-left">RPM:</h3>
            <h1 className="font-weight-light text-left"><CountUp duration={2} end={10} /></h1>
          </div>
          <Battery charge={this.state.charge} volts={this.state.charge}/>
        </div>
        <div className="row top-row">
          <div className="col-4 text-left ml-5">
            <h3>ELAPSED:</h3>
            <h2 className="text-left font-weight-light">
              <ReactStopwatch seconds={0} minutes={0} hours={0}>{({ formatted }) => (<p>{formatted}</p>)}</ReactStopwatch>
            </h2>
            {/* <h2 className="">Elapsed:<b><Clock className={"d-block mr-4"} format={'hh:mm:ss'} ticking={true} timezone={'US/Pacific'} /></b></h3> */}
          </div>
          <div className="col-3 text-left ml-2">
            <p>MOTOR:</p>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 512 512" width="512" height="512" fill="white"><title>Car engine </title><rect x="221" y="154" width="79" height="32" /><path d="M374,382V342.455c0-3.866,3.206-7.455,7.072-7.455H403V246H381.072A7.316,7.316,0,0,1,374,238.709V200H146v38.709A7.257,7.257,0,0,1,139,246H117v89h22c3.866,0,7,3.589,7,7.455V382ZM235,303a7,7,0,0,1-4.827-12.069l42-40a7,7,0,0,1,9.654,10.138L252.5,289H275a7,7,0,0,1,4.95,11.95l-40,40a7,7,0,0,1-9.9-9.9L258.1,303Z" /><rect x="90" y="280" width="13" height="21" /><path d="M456,332.164a7,7,0,0,0,7-7V256a7,7,0,0,0-14,0v24H417v21h32v24.164A7,7,0,0,0,456,332.164Z" /><path d="M56,249a7,7,0,0,0-7,7v69.164a7,7,0,0,0,14,0V301H76V280H63V256A7,7,0,0,0,56,249Z" /><path d="M300,130h24.012a7,7,0,0,0,0-14H197.21a7,7,0,0,0,0,14H221v10h79Z" /></svg>
            <h1 className="font-weight-light text-left"><CountUp duration={2} end={88} suffix={"℉"} /></h1>
            {/* <h2 className="">Elapsed:<b><Clock className={"d-block mr-4"} format={'hh:mm:ss'} ticking={true} timezone={'US/Pacific'} /></b></h3> */}
          </div>
          <div className="col-3 text-left ml-2">
            <p>BATTERY:</p>
            <h1 className="font-weight-light text-left"><CountUp duration={2} end={75} suffix={"℉"} /></h1>
            {/* <h2 className="">Elapsed:<b><Clock className={"d-block mr-4"} format={'hh:mm:ss'} ticking={true} timezone={'US/Pacific'} /></b></h3> */}
          </div>
        </div>
        {/* <div className="row fixed-bottom batterySection no-gutters">
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
        </div> */}
      </div>
    );
  }
}

export default App;
