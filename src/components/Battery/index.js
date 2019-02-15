import React, { Component } from 'react'
import styled from 'styled-components';
import CountUp from 'react-countup';
export default class Battery extends Component {
    constructor(props) {
        super(props)
        this.percentStart = 0;
        this.voltStart= 0;
    }
    render() {
    var bg = "green";
    if (this.props.charge > 55) {
        bg="green";
    } else if (this.props.charge > 30){
        bg= "orange";
    } else {
        bg="red";
    }
    var Level = styled.div`
        &:before{
        height: ${this.props.charge}%;
        background: ${bg};
        border-top: ${bg};
        }
        
    `;
    return (
        <Level className="col-3 text-center battery-border ml-auto mr-4 p-0" >
            <div className="battery-data">
                <h1 className="display-4"><CountUp start={this.percentStart} end={this.props.charge} onEnd={() => { this.percentStart = this.props.charge }} />%</h1>
                <h3 className=""><CountUp start={this.voltStart} end={this.props.charge} onEnd={() => { this.voltStart = this.props.charge }} /> V</h3>
            </div>
        </Level>
    )
    }
}