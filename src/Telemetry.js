import React, { Component } from "react";
import { AppBar, Toolbar, Fab, Grid, Paper, Typography} from "@material-ui/core";
import {Slider} from '@material-ui/lab';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGL, {GeolocateControl, Marker} from 'react-map-gl';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, grey} from "@material-ui/core/colors";
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationIcon from '@material-ui/icons/Navigation';

import io from 'socket.io-client';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

class Telemetry extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.carSocket = io('https://car.matadormotorsports.racing');
    this.state = {
      value: 0,
      carLat: 34.2418,
      carLong: -118.5289,
      viewport: {
          width: 400,
          height: 400,
          latitude: 34.2418,
          longitude: -118.5289,
          zoom: 17,
          bearing:0,
          pitch: 50
        }
      };
      this.subscribeToLocation();
  };
  
  subscribeToLocation(){
    this.carSocket.on('location', (data) => {
      this.setState({ carLat: data.lat, carLong: data.long});
    });

  }
  _onViewportChange = viewport => this.setState({ viewport });

  start(){
  this.carSocket.emit('can_bus', { 'action': 'accelerate', 'value': 25 });
  }
  end(){
    this.carSocket.emit('can_bus', { 'action': 'stop' });
  }
  handleSlider(event, value){
    this.setState({ 'value': value });
    this.carSocket.emit('can_bus', { 'action': 'accelerate', 'value': value });
  };
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
          <div>
            <ReactMapGL
              {...this.state.viewport}
              {...this.state.settings}
              onViewportChange={(viewport) => this.setState({ viewport })}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              width="100%"
              mapStyle="mapbox://styles/mapbox/dark-v9"
            mapOptions={{ 'logoPosition': 'bottom-right','interactive':'false'}}
      >
            <Marker latitude={this.state.carLat} longitude={this.state.carLong} className="h1">🏎️</Marker>
              <GeolocateControl
                style={geolocateStyle}
                onViewportChange={this._onViewportChange}
                positionOptions={{ enableHighAccuracy: true }}
                fitBoundsOptions={{ maxZoom: 20 }}
                trackUserLocation={true}
              />
            </ReactMapGL>
        </div>
        <Typography align="center" variant="h1">{this.state.value}</Typography>
        <div>
          <Grid container style={{ padding: 20 }} spacing={24}>
            <Grid item xs={12}>
              <Slider
                vertical
                value={this.state.value}
                min={0}
                max={100}
                onChange={this.handleSlider.bind(this)}
                step={1}
                style={{
                  display: 'flex',
                  height: 300, }}
                />
            </Grid>
            <Grid item xs={6}>
              <Paper>xs=6</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>xs=3</Paper>
            </Grid>
          </Grid>
        </div>
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
