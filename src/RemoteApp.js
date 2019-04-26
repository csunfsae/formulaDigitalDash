import React, { Component } from "react";
import {
	AppBar,
	Toolbar,
	Fab,
	Grid,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Switch,
	Tabs,
	Tab,
	Paper,
	IconButton
} from "@material-ui/core";
import { Slider, ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl';

import PulsatingDot from './components/PulsingStatus';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, grey } from "@material-ui/core/colors";
import CssBaseline from '@material-ui/core/CssBaseline';
import { PlayArrow, Stop, ArrowBack, PowerSettingsNew } from '@material-ui/icons';

import io from 'socket.io-client';

const geolocateStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	margin: 10
};

class RemoteApp extends Component {
	constructor(props) {
		super(props);
		this.carSocket = io('https://car.matadormotorsports.racing');
		this.state = {
			value: 0,
			liability: false,
			carDirection: 'stop',
			liabilityAlert: false,
			carLat: 34.2418,
			carLong: -118.5289,
			viewport: {
				width: 400,
				height: 300,
				latitude: 34.2418,
				longitude: -118.5289,
				zoom: 17,
				bearing: 0,
				pitch: 50
			}
		};
		this.subscribeToLocation();
		this.handleClose = this.handleClose.bind(this);
		this.handleSlider = this.handleSlider.bind(this);
		this.handleDirection = this.handleDirection.bind(this);
		this.stop = this.stop.bind(this);
	};
	subscribeToLocation() {
		this.carSocket.on('location', (data) => {
			this.setState({ carLat: data.lat, carLong: data.long });
		});
	}
	handleClose(value) {
		this.setState({ 'liabilityAlert': false, 'liability': value });
	};

	_onViewportChange = viewport => this.setState({ viewport });

	start() {
		if (this.state.carDirection === 'drive') {
			this.carSocket.emit('can_bus', { 'action': 'accelerate', 'value': 0 - this.state.value });
		} else {
			this.carSocket.emit('can_bus', { 'action': 'accelerate', 'value': this.state.value });
		}
	}
	end() {
		this.carSocket.emit('can_bus', { 'action': 'stop' });
	}
	stop() {
		this.carSocket.emit('can_bus', { 'action': 'toggle_analog' });
		this.setState({ 'carDirection': 'stop' });
	}
	handleSlider(event, value) {
		if (value > 30 & this.state.liability !== true) {
			this.end();
			this.setState({ 'liabilityAlert': true });
		} else {
			this.setState({ 'value': value });
		}
	};
	handleDirection(event, value) {
		if (value !== 'stop') {
			this.carSocket.emit('can_bus', { 'action': 'toggle_digital' });
		} else {
			this.carSocket.emit('can_bus', { 'action': 'toggle_analog' });
		}
		this.setState({ 'carDirection': value });
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
			<div style={{ 'overflow': 'hidden' }}>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<div>
						<ReactMapGL
							{...this.state.viewport}
							{...this.state.settings}
							onViewportChange={viewport => this.setState({ viewport })}
							mapStyle="mapbox://styles/mapbox/dark-v9"
							width="100%"
							mapboxApiAccessToken="pk.eyJ1IjoiYTEzeGVteiIsImEiOiJjanJoZnEyOGUwOGplNDVucmNweDVvMGZiIn0.YQZVlws7EzU84cORWfNamg"
							mapOptions={{
								logoPosition: "bottom-right",
								interactive: "false"
							}}
						>
							<Marker
								latitude={this.state.carLat}
								longitude={this.state.carLong}
								className="h1"
							>
								<span role="img">️🏎</span>
							</Marker>
							<GeolocateControl
								style={geolocateStyle}
								onViewportChange={this._onViewportChange}
								positionOptions={{ enableHighAccuracy: true }}
								fitBoundsOptions={{ maxZoom: 20 }}
								trackUserLocation={true}
							/>
						</ReactMapGL>
					</div>
					<div>
						<Grid container style={{ padding: 20 }} spacing={24}>
							<Grid item xs>
								<Typography variant="h2" align="center" gutterBottom>
									{this.state.value}%
						</Typography>
								<Paper>
									<Tabs
										value={this.state.carDirection}
										onChange={this.handleDirection}
										variant="fullWidth"
										indicatorColor="primary"
										textColor="primary"
									>
										<Tab icon={<ArrowBack />} label="Reverse" value="reverse" />
										<Tab icon={<Stop />} label="Stop" value="stop" />
										<Tab icon={<PlayArrow />} label="Drive" value="drive" />
									</Tabs>
								</Paper>
							</Grid>
						</Grid>
						<Grid container style={{ padding: 20 }} spacing={24}>
							<Grid item xs>
								<Slider
									value={this.state.value}
									min={0}
									max={100}
									onChange={this.handleSlider}
									step={1}
									disabled={this.state.carDirection === 'stop'}
								/>
							</Grid>
						</Grid>
					</div>
					<Dialog
						open={this.state.liabilityAlert}
						// onClose={this.handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{"Speed Warning"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								A speed over 50 can cause issues, please be aware of what your doing.
						</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => this.handleClose(false)} color="primary">
								Disagree
						</Button>
							<Button onClick={() => this.handleClose(true)} color="primary" autoFocus>
								Agree
						</Button>
						</DialogActions>
					</Dialog>

					<AppBar
						style={{ top: "auto", bottom: 0 }}
						position="fixed"
						color="primary"
					>
						<div>
							<PulsatingDot
								id={"puslingDot"}
								className={"d-block ml-4 mt-2"}
								status={true}
							/>
						</div>

						<Fab
							disabled={this.state.carDirection === 'stop'}
							variant="extended"
							aria-label="Add"
							size="large"
							disableRipple
							onTouchStart={() => {
								this.start();
							}}
							onTouchEnd={() => {
								this.end();
							}}
							style={{
								position: "relative",
								zIndex: 1,
								top: -30,
								left: 0,
								right: 0,
								margin: "0 auto"
							}}
						>
							<PlayArrow /> Accelerate
						</Fab>
						<div>
							<IconButton color="inherit">
								<PowerSettingsNew />
							</IconButton>
						</div>
					</AppBar>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default RemoteApp;
