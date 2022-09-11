import React from 'react';
import styled from "styled-components";
import { Container as bContainer, Row as bRow, Col as bCol, Button as bButton, Form as bForm } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export const H1 = styled.h1`
font-family:'Hingashi Extended', sans-serif;
font-weight:300;
font-size:3em;
font-style:italic;
`

export const Container = styled(bContainer)`
padding:0;
display:flex;
flex-direction:column;
flex-grow:1;
`
export const Row = styled(bRow)`
margin-left:0;
margin-right:0;
flex-grow:0;
`
export const Col = styled(bCol)`
padding-left:0;
padding-right:0;
`


export const Button = styled(bButton)`
    overflow: hidden;
`

export const IconButtonContainer = styled(Button)`
    padding: 0 !important;
	line-height: 0;
	font-size: 1.5em;
    width:40px;
    height:40px;

    &.btn-lg {
        height: 80px;
        width: 80px;
        font-size: 4em;
    }
`

export const SlideButtonContainer = styled(IconButtonContainer)`
font-size:1em;
width:20px;
height:80px;
`

export const IconButton = function IconButton(props) {
    return (
        <IconButtonContainer variant={props.variant} size={props.size} onClick={props.onClick}><FontAwesomeIcon icon={props.icon} /></IconButtonContainer>
    );
}

export const SliderButton = function SliderButton(props) {
    return (
        <SlideButtonContainer variant={props.variant} size={props.size}><FontAwesomeIcon icon={props.icon} /></SlideButtonContainer>
    );
}

export const Form = {
    Control: styled(bForm.Control)``,
    Text: styled(bForm.Text)``,
    Label: styled(bForm.Label)``,
    Range: styled(bForm.Range)`
    width:160px;
    `
}

export function Divider() {
    return (
        <DividerOuter>
            <DividerInner />
        </DividerOuter>
    );
}

const DividerOuter = styled.div`
width:40px;
height:40px;
text-align:center;
margin:0px;
padding:8px;
`

const DividerInner = styled.div`
background:#fff6;
width:1px;
height:100%;
margin:auto;
`

export const PianoKeyOuter = styled(bButton)`
padding:.2em .5em;
width:100%;
height:20px;
display:block;
background: ${props => props.sharp ? "linear-gradient(90deg, #444, #111)" : "linear-gradient(90deg, #bbb, #eee)"};
color:${props => props.sharp ? "#ccc" : "#222"};
border-color: ${props => props.sharp ? "#444" : "#0002"};
box-shadow:none;
text-align:right;
line-height:0;
overflow:hidden;
font-size:1em;
border-radius: ${function (props) {
        switch (props.name) {
            case "F":
            case "C":
                return "0 4px 0 0";
            case "E":
            case "B":
                return "0 0 4px 0";
            default:
                return "0 4px 4px 0";
        }
    }};
&.btn:hover,&.btn:hover:focus {
    background: ${props => props.sharp ? "linear-gradient(90deg, #555, #222)" : "linear-gradient(90deg, #aaa, #ccc)"};
    color:${props => props.sharp ? "ccc" : "#222"};
}
`

export class PianoOctave extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="B"></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="A#" sharp></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="A"></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="G#" sharp></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="G"></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="F#" sharp></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="F"></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="E"></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="D#" sharp></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="D"></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="C#" sharp></PianoKey>
                <PianoKey number={this.props.octaveNumber} player={this.props.player} name="C"></PianoKey>
            </>
        );
    }
}

export class PianoKey extends React.Component {
    constructor(props) {
        super(props);
    }

    playNote = (event) => {
        this.props.player.play(`${this.props.name}${this.props.number}`);
    }

    render() {
        
        return (
            <PianoKeyOuter sharp={this.props.sharp} name={this.props.name} onClick={this.playNote}>
                {this.props.name}{this.props.number}
            </PianoKeyOuter>
        );
    }
}

export const MeasureOuter = styled(bButton)`
padding:.2em .5em;
width:160px;
height:20px;
display:block;
box-shadow:none;
text-align:left;
line-height:0;
overflow:hidden;
font-size:1em;
border-color:#0003;
border-radius:3px 3px 0 0;
`

export class Measure extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MeasureOuter>
                M
            </MeasureOuter>
        );
    }
}

export const Text = props => {
    return (
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
    );
}