import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Fab,} from "@material-ui/core";
import 'mapbox-gl/dist/mapbox-gl.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import ReactMapGL, {GeolocateControl} from 'react-map-gl';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, grey} from "@material-ui/core/colors";
import NavigationIcon from '@material-ui/icons/Navigation';

import io from 'socket.io-client';
const socket = io('https://car.matadormotorsports.racing');

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

class Telemetry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }
  _onViewportChange = viewport => this.setState({ viewport });

  start(){
    socket.emit('accelerate', { 'action': 'start' });
  }
  end(){
    socket.emit('accelerate', { 'action': 'stop' });
  }
  render() {
    const theme = createMuiTheme({
      palette: {
        type: "dark",
        primary: red,
        secondary: grey
      }
    });
    return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken="pk.eyJ1IjoiYTEzeGVteiIsImEiOiJjanJoZnEyOGUwOGplNDVucmNweDVvMGZiIn0.YQZVlws7EzU84cORWfNamg"
          width="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
        >
          <GeolocateControl
            style={geolocateStyle}
            onViewportChange={this._onViewportChange}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </ReactMapGL>
          <AppBar
            style={{ top: "auto", bottom: 0 }}
            position="fixed"
            color="primary"
          >
            <Toolbar
              style={{
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Fab
                color="white"
                variant="extended"
                aria-label="Add"
                size="large"
                onTouchStart={() => { this.start() }}
                onTouchEnd={() => { this.end() }}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: -30,
                  left: 0,
                  right: 0,
                  margin: "0 auto"
                }}
                >
                <NavigationIcon/> Extended
              </Fab>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
    );
  }
}

export default Telemetry;
