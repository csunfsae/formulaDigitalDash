import React, { Component } from 'react';

import io from 'socket.io-client';
import Clock from 'react-live-clock';
import Cover from 'react-video-cover';
import queryString from 'query-string';
import {Alert} from 'reactstrap';

import PulsatingDot from './components/PulsingStatus';
import CellSignal from './components/CellSignal';
import SpeedBar from './components/SpeedBar';
import CountUp  from 'react-countup';
// import Battery from './components/Battery';
// import ReactStopwatch from 'react-stopwatch';

import './Dash.scss';

class Dash extends Component {
  constructor(props) {
    super(props);
    this.params = queryString.parse(this.props.location.search);
    
    this.state = {
      showVideo: "none",
      connected: false,
      charge: 100,
      signalStrength: 0,
      signalType: false,
      mph: 0,
      batterystart: 0,
      stopWatch: false,
      eaClicks: 0,
    };
    
    this.socket = io("http://10.42.0.1:3000");
    this.videoRef = React.createRef();

    this.handleConnection = this.handleConnection.bind(this);
    this.easterEgg = this.easterEgg.bind(this);
  }
  handleConnection() {
    this.setState({
      connected: this.socket.connected
    });
  }
  easterEgg() {
    let display = "";
    if (this.state.showVideo === "none"){
      this.setState({
        eaClicks: this.state.eaClicks + 1
      });
    }
    if (
      this.state.showVideo === "none" &&
      this.state.eaClicks % 5 === 0 &&
      this.state.eaClicks !== 0
    ) {
      this.videoRef.current.play();
      display = "block";
    }else {
      this.videoRef.current.currentTime = 0;
      display = "none";
    }
    this.setState({
      showVideo: display
    });
  }

  componentWillMount() {
    this.socket.on("connect", () => {
      this.handleConnection();
    });
    this.socket.on("reconnecting", () => {
      this.handleConnection();
    });
    this.socket.on("location", data => {
      // this.setState(data);
    });
    this.socket.on("speed", data => {
      this.setState({ "mph": data.value});
    });
    this.socket.on("can_bus", function(data){
      if(data.action === 'toggle_digital'){
        alert("Car is being controlled remotely");
      }
    })
  }
  
  render() {
    // var highVoltageColor;

    // if (hvReading > 335) {
    //   highVoltageColor = '#66CD00';
    // } else if (hvReading > 280) {
    //   highVoltageColor = '#FCD116';
    // } else {
    //   highVoltageColor = '#FF3333';
    // }
    // var lowVoltage;
    // if (lvReading > 13.5) {
    //   lowVoltage = '#66CD00';
    // } else if (lvReading > 12.5) {
    //   lowVoltage = '#FCD116';
    // } else {
    //   lowVoltage = '#FF3333';
    // }
    // var batteryTemps;
    // if (btReading > 50) {
    //   batteryTemps = '#FF3333';
    // } else if (btReading > 40) {
    //   batteryTemps = '#FCD116';
    // } else {
    //   batteryTemps = '#66CD00';
    // }

    return (
      <div className="dash-pg">
        <div className="row status-bar d-flex justify-content-end mt-2">
          <PulsatingDot
            id={"puslingDot"}
            className={"d-block ml-4 mt-2"}
            status={this.socket.connected}
          />
          <CellSignal
            className={"d-block mt-1 ml-2 mr-auto"}
            signalType={this.state.signalType}
            signalStrength={this.state.signalStrength}
          />
          <div className={"d-block mr-2 mt-1"}>65°F</div>
          <Clock
            className={"d-block mr-4 mt-1"}
            format={"h:mm A"}
            ticking={true}
            timezone={"US/Pacific"}
          />
        </div>
        <div onClick={this.easterEgg}>
          <img
            alt="logo"
            draggable={false}
            className="ealogo"
            src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/419.vresize.100.100.high.0.png"
          />
        </div>
        <SpeedBar speed={this.state.mph} />
        <div className="row top-row">
          <div className="col-3 text-left ml-6 mr-auto">
            <div className="border-success rounded info-border mb-2 text-center">
              <p>Low Volt:</p>
              <h1 className="font-weight-light">
                <CountUp duration={2} end={31} suffix={"V."} />
              </h1>
            </div>
            {/* <h2 className="">Elapsed:<b><Clock className={"d-block mr-4"} format={'hh:mm:ss'} ticking={true} timezone={'US/Pacific'} /></b></h3> */}
            <div className="border-success rounded info-border text-center">
              <p>High Volt:</p>
              <h1 className="font-weight-light">
                <CountUp duration={2} end={33} suffix={"V."} />
              </h1>
            </div>
          </div>
          <div className="speed-border ml-auto mr-auto vertical-align-center">
            <h2 className="text-center ">MPH</h2>
            <h1 className="text-center display-2">
              <CountUp duration={1} end={this.state.mph} />
            </h1>
          </div>
          <div className="col-3 text-left ml-auto mr-6 text-center">
            <div className="border-success rounded info-border mb-2">
              <p>MOTOR:</p>
              <h1 className="font-weight-light">
                <CountUp duration={2} end={32} suffix={"°C"} />
              </h1>
            </div>
            <div className="border-success rounded info-border text-center">
              <p>BATTERY:</p>
              <h1 className="font-weight-light">
                <CountUp duration={2} end={30} suffix={"°C"} />
              </h1>
            </div>
          </div>
        </div>
        <div className="row top-row">
        </div>
        <div className="row fixed-bottom batterySection">
          <h3
            className="mt-auto mb-auto ml-4"
            style={{
              textShadow:
                "-1px 0 rgba(17, 17, 17, 0.5), 0 1px rgba(17, 17, 17, 0.5), 1px 0 rgba(17, 17, 17, 0.5), 0 -1px rgba(17, 17, 17, 0.5)"
            }}
          >
            Volts: <CountUp duration={2} end={10} suffix={"v."} />
          </h3>
        </div>
        <div className="ea" style={{ display: this.state.showVideo }}>
          <Cover
            videoOptions={{
              src: "/ea.mp4",
              autoPlay: false,
              onEnded: this.easterEgg,
              ref: this.videoRef
            }}
          />
        </div>
      </div>
    );
  }
}

export default Dash;
