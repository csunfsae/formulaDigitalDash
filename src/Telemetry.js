import io from 'socket.io-client';
import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import './telemetry.css';

const socket = io('https://api.matadormotorsports.racing:443', {multiplex: false});

class Telemetry extends Component {
    sendDriverMessage() {
        //alert("Driver notified");
    
        socket.on('driver_alert', function(socket) {
            socket.emit('request', /* */); // emit an event to the socket
            io.emit('broadcast', /* */); // emit an event to all connected sockets
            socket.on('reply', function(){ /* */ }); // listen to the event
        });
    
        console.log("Driver notified");
    }
    
    sendCANMessage() {
        //alert("Modified successfully");
    
        socket.on('new_max_voltage', function(socket) {
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

    render() {
        return ( 
        <table class="table-container">

            <tr>
                <td id="current-value">
                    95
                </td>

                {/* Not sure why there's a redundant slider */}
                <td id="slider-color">
                    <Slider
                        // step={1}
                        // maximumValue={100}
                        // onValueChange={this.change.bind(this)}
                        // value={value}
                    />
                    <input type="range" min="225" max="450" value="250" class="slider" id="myRange"/>
                </td>
                <td>
                    <button id = "voltage-submit" type="submit" onclick="sendCANMessage()">Submit</button>
                </td>

            </tr>

            <tr>
                <td id="timer-box">
                    00:00:00
                </td>
                <td>
                    <button id="timer-toggle-button" onclick="toggleTimer()">Start/Stop</button>      
                </td>
                <td>
                    <button id="reset-button" onclick="resetTimer()">Reset</button>
                </td>
            </tr>

            <tr>
                <td>
                    <input id = "input-field" type="text" placeholder="Message driver"/>
                </td>

                <td>
                    <button type="submit" id="send-button" onclick="sendDriverMessage()">Send</button>    
                </td>
            </tr>
            
        </table> )
    }
}

export default Telemetry;