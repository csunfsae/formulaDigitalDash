import io from 'socket.io-client';
import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import {Button} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import './telemetry.css';

class Telemetry extends Component {

    constructor(props) {
        super(props);
        this.socket = io('https://car.matadormotorsports.racing');

        this.state = {
            value: 0,
            carDirection: 'stop',
        };

        this.driveBackward = this.driveBackward.bind(this);
        this.driveForward = this.driveForward.bind(this);
    }
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

  MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
  
    sendDriverMessage() {
        //alert("Driver notified");
    
        this.socket.on('driver_alert', function(socket) {
            socket.emit('request', /* */); // emit an event to the socket
            io.emit('broadcast', /* */); // emit an event to all connected sockets
            socket.on('reply', function(){ /* */ }); // listen to the event
        });
    
        console.log("Driver notified");
    }
    
    sendCANMessage() {
        //alert("Modified successfully");
    
        this.socket.on('new_max_voltage', function(socket) {
            socket.emit('request', /* */); // emit an event to the socket
            io.emit('broadcast', /* */); // emit an event to all connected sockets
            socket.on('reply', function(){ /* */ }); // listen to the event
        });
    
        console.log("Modified successfully");
    }
    
    toggleTimer() {
        //alert("Toggle timer");
        console.log("Toggle timer action");
    }
    
    resetTimer () {
        this.confirm("Are you sure you want to reset?");
        //alert("Reset timer");
        console.log("Reset timer");
    }
    
    getCurrentValue() {
        var currentReading = 450;
        document.getElementById("current-value").innerHTML = currentReading;
        document.getElementById("myRange").value = currentReading;
    }

    driveForward() {
        console.log("Forward drive command sent");
        this.socket.emit('can_bus', { 'action': 'accelerate', 'value': 0 - this.state.value });
	}

    driveBackward() {
        console.log("Backward drive command sent");
        this.socket.emit('can_bus', { 'action': 'accelerate', 'value': this.state.value });
    }

    render() {
        return ( 
        <table>

            <tr>
                <td id="current-value">
                    95
                </td>
                <div>
                    <Slider
                    class="slider" 
                    id="myRange"
                        value={this.state.value}
                        step={1}
                        maximumValue={100}
                        onChange={this.handleChange}
                        //value={value}
                    />
                </div>
                <td>
                    <Button variant="contained" color="primary" id = "voltage-submit" type="submit" onclick="sendCANMessage()">Submit</Button>
                </td>
            </tr>

            <tr>
                <td id="timer-box">
                    00:00:00
                </td>
                <td>
                    <Button variant="contained" color="primary" id="timer-toggle-button" onclick="toggleTimer()">Start/Stop</Button>      
                </td>
                <td>
                    <Button variant="contained" color="secondary" id="reset-button" onclick="resetTimer()">Reset</Button>
                </td>
            </tr>

            <tr>
                <td id="direction-indicator">
                    Stationary
                </td>
                <td>
                    <Button onClick={() => this.driveBackward()} variant="contained" color="primary" id="timer-toggle-button" >Backward</Button>      
                </td>
                <td>
                    <Button onClick={() => this.driveForward()} variant="contained" color="secondary" id="reset-button" >Forward</Button>
                </td>
            </tr>
        </table> )
    }
}

export default Telemetry