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
        let measure = pos.x/player.beatsToPixels;
        let beat = Math.floor(measure*player.subdivisions);
        console.log(`measure ${measure}`);
        console.log(`beat ${beat}`);
        let beatsPerSecond = this.props.song.bpm / 60;
        console.log(`${beatsPerSecond}`);
        //console.log(`time ${}`)
    }

    render() {
        return (
                <>
                <Row style={{height:"20px"}}>
                    <CanvasPanel xs="2" style={{width:"120px"}}>
                    </CanvasPanel>
                    <CanvasPanel>
                    <PianoRoll>
                            <Stack direction="horizontal" gap={0}>
                            <Measure/>
                            <Measure/>
                            <Measure/>
                            <Measure/>
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
                        <SequencerCanvas onCanvasClick={this.onCanvasClick} player={this.props.player}/>
                    </CanvasPanel>
                </SequenceRow>
                </>
        );
    }
}

export default Sequencer;