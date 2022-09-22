import styled from "styled-components";
import { InputGroup, Stack } from 'react-bootstrap';

import { Icon, IconButton, Form, Button, Divider, PianoKey, PianoOctave, Container, Row, Col, Measure } from "./layout/layout";
import { faMusic, faSearchPlus, faSearchMinus, faSearchLocation, faEdit, faMousePointer, faEraser, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import SequencerCanvas from "./SequencerCanvas";

const SequenceRow = styled(Row)`
flex-grow:1;
flex-shrink:1;
position:relative;
overflow:hidden;
flex-basis:0;
`;

const PianoRoll = styled(Col)`
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
overflow:hidden;
`
const CanvasPanel = styled(Col)`
position:relative;
`

class Sequencer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        console.log(event.target.value);
    }

    onCanvasClick = (event, pos, canvas) => {
        let player = this.props.player;
        let beat = pos.x/player.beatsToPixels;
        let quantizedBeat = Math.floor(beat*player.subdivisions) / player.subdivisions;
        //let beat = Math.floor(measure*player.subdivisions);
        //console.log(`measure ${measure}`);
        console.log(`beat ${quantizedBeat}`);
        
        let beatsPerSecond = this.props.song.bpm / 60;
        console.log(`bps: ${beatsPerSecond}`);
        console.log(`second: ${quantizedBeat / beatsPerSecond}`);
        //console.log(`time ${}`)
    }

    render() {
        let measureWidth = this.props.player.beatsToPixels * this.props.song.timeSignature;
        
        return (
                <>
                <Row style={{height:"20px"}}>
                    <CanvasPanel xs="2" style={{width:"120px"}}>
                    </CanvasPanel>
                    <CanvasPanel>
                    <PianoRoll>
                            <Stack direction="horizontal" gap={0}>
                            <Measure width={measureWidth}/>
                            <Measure width={measureWidth}/>
                            <Measure width={measureWidth}/>
                            <Measure width={measureWidth}/>
                            </Stack>
                        </PianoRoll>
                    </CanvasPanel>
                </Row>
                <SequenceRow>
                    <CanvasPanel xs="2" style={{width:"120px"}}>
                        <PianoRoll>
                            <Stack direction="vertical" gap={0}>
                                <PianoKey number={6} name="C" mouse={this.props.mouse} player={this.props.player}></PianoKey>
                                <PianoOctave octaveNumber={5} mouse={this.props.mouse} player={this.props.player}/>
                                <PianoOctave octaveNumber={4} mouse={this.props.mouse} player={this.props.player}/>
                                <PianoOctave octaveNumber={3} mouse={this.props.mouse} player={this.props.player}/>
                            </Stack>
                        </PianoRoll>
                    </CanvasPanel>
                    <CanvasPanel>
                        <SequencerCanvas onCanvasClick={this.onCanvasClick} song={this.props.song} player={this.props.player}/>
                    </CanvasPanel>
                </SequenceRow>
                </>
        );
    }
}

export default Sequencer;