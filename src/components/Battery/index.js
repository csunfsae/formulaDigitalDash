import React, { Component } from 'react'
import styled from 'styled-components';
import CountUp from 'react-countup';
import { subscribeToSpeed } from '../../api';

export default class Battery extends Component {
    constructor(props) {
        super(props)
        this.percentStart = 0;
        this.voltStart= 0;
        this.state = {charge : 100}
        // subscribeToSpeed((err, data) => this.setState({charge: 100}));
    }
    render() {
    var bg = "green";
    if (this.state.charge > 50) {
        bg="green";
    } else if (this.state.charge > 25){
        bg= "orange";
    } else {
        bg="red";
    }
    var Level = styled.div`
        &:before{
        height: ${this.state.charge}%;
        background: ${bg};
        border-top: ${bg};
        }
        
    `;
    return (
        <Level className="col-2 text-center battery-border ml-auto p-0" >
            <div className="battery-data">
                <h5>Charge:</h5>
                <h1 className="display-5"><CountUp start={this.percentStart} end={this.state.charge} onEnd={() => { this.percentStart = this.state.charge }} />%</h1>
            </div>
        </Level>
    )
    }
}