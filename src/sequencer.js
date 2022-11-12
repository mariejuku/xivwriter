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

const pitches = [
    'C6',
    'B5', 'A#5', 'A5', 'G#5', 'G5', 'F#5', 'F5', 'E5', 'D#5', 'D5', 'C#5', 'C5',
    'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4',
    'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3'
]

class Sequencer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pos: {
                pitch: 'C5',
                beat: 0
            }
        }
    }

    MousePosToSequencePos = (pos) => {
        let editor = this.props.editor;
        let beat = pos.x / editor.beatsToPixels;
        let quantizedBeat = Math.floor(beat * editor.subdivisions) / editor.subdivisions;

        let beatsPerSecond = this.props.song.bpm / 60;
        let second = quantizedBeat / beatsPerSecond;
        let pitch = pitches[Math.floor(pos.y / 20)];
        return {
            pitch: pitch,
            beat: beat
        };
    }

    onCanvasClick = (button, mousePos) => {
        let rollPos = this.MousePosToSequencePos(mousePos);
        this.props.editor.SelectInPianoRoll(rollPos.pitch, rollPos.beat);
    }

    onDropNote = (note, mousePos) => {
        console.log('mouse pos:');
        console.log(mousePos);
        let rollPos = this.MousePosToSequencePos(mousePos);
        console.log('move note pos:');
        console.log(rollPos);
        console.log(note);
        this.props.song.MoveNote(note.track.index, note.key, rollPos.pitch, rollPos.beat);
    }

    render() {
        let measureWidth = this.props.editor.beatsToPixels * this.props.song.timeSignature;

        return (
            <>
                <Row style={{ height: "20px" }}>
                    <CanvasPanel xs="2" style={{ width: "120px" }}>
                    </CanvasPanel>
                    <CanvasPanel>
                        <PianoRoll>
                            <Stack direction="horizontal" gap={0}>
                                <Measure width={measureWidth} />
                                <Measure width={measureWidth} />
                                <Measure width={measureWidth} />
                                <Measure width={measureWidth} />
                            </Stack>
                        </PianoRoll>
                    </CanvasPanel>
                </Row>
                <SequenceRow>
                    <CanvasPanel xs="2" style={{ width: "120px" }}>
                        <PianoRoll>
                            <Stack direction="vertical" gap={0}>
                                <PianoKey number={6} name="C" mouse={this.props.mouse} editor={this.props.editor}></PianoKey>
                                <PianoOctave octaveNumber={5} mouse={this.props.mouse} editor={this.props.editor} />
                                <PianoOctave octaveNumber={4} mouse={this.props.mouse} editor={this.props.editor} />
                                <PianoOctave octaveNumber={3} mouse={this.props.mouse} editor={this.props.editor} />
                            </Stack>
                        </PianoRoll>
                    </CanvasPanel>
                    <CanvasPanel>
                        <SequencerCanvas onCanvasClick={this.onCanvasClick} onDropNote={this.onDropNote}
                            song={this.props.song} editor={this.props.editor}
                            pos={this.state.pos} />
                    </CanvasPanel>
                </SequenceRow>
            </>
        );
    }
}

export default Sequencer;