import React from 'react';
import styled from "styled-components";
import { Container as bContainer, Row as bRow, Col as bCol, Button as bButton, Form as bForm } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PianoKeyOuter = styled(bButton)`
&,&.btn:focus {
padding:.2em .5em;
width:100%;
height:20px;
display:block;
background: ${props => props.$sharp ? "linear-gradient(90deg, #444, #111)" : "linear-gradient(90deg, #bbb, #eee)"};
color:${props => props.$sharp ? "#ccc" : "#222"};
border-color: ${props => props.$sharp ? "#444" : "#0002"};
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
}
&.btn:hover,&.btn:hover:focus {
    background: ${props => props.$sharp ? "linear-gradient(90deg, #555, #222)" : "linear-gradient(90deg, #aaa, #ccc)"};
    color:${props => props.$sharp ? "ccc" : "#222"};
}
&.btn:hover:active {
    background: ${props => props.$sharp ? "linear-gradient(90deg, #222, #111)" : "linear-gradient(90deg, #555, #888)"};
}
`

export class PianoOctave extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="B"></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="A#" sharp></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="A"></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="G#" sharp></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="G"></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="F#" sharp></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="F"></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="E"></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="D#" sharp></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="D"></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="C#" sharp></PianoKey>
                <PianoKey mouse={this.props.mouse} number={this.props.octaveNumber} editor={this.props.editor} name="C"></PianoKey>
            </>
        );
    }
}

export class PianoKey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depressed: false
        }
    }

    onEnter = (event) => {
        if(this.props.mouse.left) {
            this.updatePress(true);
        }
    }
    onLeave = (event) => {
        this.updatePress(false);
    }

    updatePress = (newPress) => {
        if (newPress === true && newPress != this.state.depressed) {
            this.playNote();
        }
        this.setState({
            depressed: newPress
        });
    }

    playNote = (event) => {
        this.props.editor.play(`${this.props.name}${this.props.number}`);
    }

    render() {
        return (
            <PianoKeyOuter $sharp={this.props.sharp} name={this.props.name} 
            onMouseEnter={this.onEnter} 
            onMouseLeave={this.onLeave} 
            onMouseDown={()=>this.updatePress(true)}
            onMouseUp={()=>this.updatePress(false)}>
                {this.props.name}{this.props.number}
            </PianoKeyOuter>
        );
    }
}

export const MeasureOuter = styled(bButton)`
padding:.2em .5em;
width:${props => props.width}px;
height:20px;
display:block;
box-shadow:none;
text-align:left;
line-height:0;
overflow:hidden;
font-size:1em;
border-color:#0003;
border-radius:3px 3px 0 0;
flex-shrink:0;
flex-grow: 0;
`

export class Measure extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MeasureOuter width={this.props.width}>
                M
            </MeasureOuter>
        );
    }
}