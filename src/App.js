import React, { Component } from 'react';
import './App.scss';
import io from 'socket.io-client';
import PulsatingDot from './components/PulsingStatus';
import Clock from 'react-live-clock';
import CellSignal from './components/CellSignal';
import SpeedBar from './components/SpeedBar';
import CountUp  from 'react-countup';
import Battery from './components/Battery';
import ReactStopwatch from 'react-stopwatch';
import Cover from 'react-video-cover';
import ClickNHold from 'react-click-n-hold'; 

class App extends Component {
  constructor(props) {
    super(props)
    this.socket = io('https://api.matadormotorsports.racing/');
    this.state = { showVideo:"none", connected: false, charge: 100, signalStrength: 0, signalType: false, mph: 0, batterystart: 0, stopWatch:false};
    this.videoRef = React.createRef();

    this.handleConnection = this.handleConnection.bind(this);
    this.easterEgg = this.easterEgg.bind(this);
  }
  handleConnection(){
    this.setState({
      connected: this.socket.connected
    });
  }
  easterEgg(){
    let display = "";
    if(this.state.showVideo == "none"){
      this.videoRef.current.play()
      display = "block";
    } else{
      this.videoRef.current.currentTime = 0;
      display = "none";
    }
    this.setState({
      showVideo: display
    })
  }
  componentWillMount() {
    this.socket.on('connect', () => {
      this.handleConnection();
    });
    this.socket.on('reconnecting', () => {
      this.handleConnection();
    });
    this.socket.on('location', (data) =>{
      // this.something(data);
    })
  }
  render() {
    return (
      <div>
        <div className="row status-bar d-flex justify-content-end mt-2">
          <PulsatingDot id={"puslingDot"} className={"d-block ml-4 mt-2"} status={this.socket.connected} />
          <CellSignal className={"d-block mt-1 ml-2 mr-auto"} signalType={this.state.signalType} signalStrength={this.state.signalStrength} />
          {/* <Alert color="warning" className="mb-0 mr-auto">
            This is a message from the team.
          </Alert> */}
          <div className={"d-block mr-2 mt-1"}>65°F</div>
          <Clock className={"d-block mr-4 mt-1"} format={'h:mm A'} ticking={true} timezone={'US/Pacific'} />
        </div>
        <ClickNHold time={5} onClickNHold={this.easterEgg} >
          <img alt="logo" draggable={false} className="ealogo" src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/419.vresize.100.100.high.0.png" />
        </ClickNHold>
        <SpeedBar/>
        <div className="row top-row">
          <div className="speed-border">
            <h3 className="text-left ">MPH:</h3>
            <h1 className="text-center display-3" ><CountUp duration={1} end={55} /></h1>
          </div>
          <div className="col-2 text-center ml-3 mr-auto">
            <h3 className=" text-left">RPM:</h3>
            <h1 className="font-weight-light text-left"><CountUp duration={2} end={10} /></h1>
          </div>
          <Battery/>
        </div>
        <div className="row top-row">
          <div className="col-4 text-left ml-4" onClick={this.startStopWatch}>
            <h3>ELAPSED:</h3>
            <h2 className="text-left font-weight-light">
              <ReactStopwatch autoStart={this.state.stopWatch} seconds={0} minutes={0} hours={0} >{({ formatted }) => (<p>{formatted}</p>)}</ReactStopwatch>
            </h2>
          </div>
          <div className="col-3 text-left ml-auto">
            <p>MOTOR:</p>
            <h1 className="font-weight-light text-left text-warning"><CountUp duration={2} end={30} suffix={"°C"} /></h1>
            {/* <h2 className="">Elapsed:<b><Clock className={"d-block mr-4"} format={'hh:mm:ss'} ticking={true} timezone={'US/Pacific'} /></b></h3> */}
          </div>
          <div className="col-3 text-left ml-auto">
            <p>BATTERY:</p>
            <h1 className="font-weight-light text-left text-success"><CountUp duration={2} end={40} suffix={"°C"} /></h1>
            {/* <h2 className="">Elapsed:<b><Clock className={"d-block mr-4"} format={'hh:mm:ss'} ticking={true} timezone={'US/Pacific'} /></b></h3> */}
          </div>
        </div>
        <div className="row fixed-bottom batterySection">
          <h3 className="mt-auto ml-4" style={{ textShadow:'-1px 0 rgba(17, 17, 17, 0.5), 0 1px rgba(17, 17, 17, 0.5), 1px 0 rgba(17, 17, 17, 0.5), 0 -1px rgba(17, 17, 17, 0.5)'}}>Volts: <CountUp duration={2} end={10} suffix={"v."} /></h3>
        </div>
        <div className="ea" style={{ display: this.state.showVideo }} >
          <Cover videoOptions={{ src: '/ea.mp4', autoPlay: false, onEnded: this.easterEgg, ref: this.videoRef }} />
        </div>
      </div>
    );
  }
}

export default App;
