import styled from "styled-components";
import { InputGroup, Stack } from 'react-bootstrap';
import { pitches } from "./constants";
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
`;
const CanvasPanel = styled(Col)`
position:relative;
`;

class Sequencer extends React.Component {
    constructor(props) { super(props); }

    CanvasPosToSequencePos = (pos) => {
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
        let rollPos = this.CanvasPosToSequencePos(mousePos);
        this.props.editor.SelectInPianoRoll(rollPos.pitch, rollPos.beat);
    }

    onDropNote = (note, sequencePos) => {
        this.props.song.EditNote(note.track.index, note.key, sequencePos.pitch, sequencePos.beat, note.duration);
    }

    onDropNoteHandle = (note, handleSide, sequencePos) => {
        let newDuration = note.duration;
        let newBeat = note.beat;
        switch(handleSide) {
            case 'left':
                newDuration = (note.duration + note.beat) - sequencePos.beat;
                newBeat = Math.min(-.125 + note.duration + note.beat,sequencePos.beat);
                break;
            case 'right':
                newDuration = sequencePos.beat - note.beat;
                break;
        }
        newDuration = Math.max(newDuration, 0.125);
        this.props.song.EditNote(note.track.index, note.key, note.pitch, newBeat, newDuration);
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
                        <SequencerCanvas onCanvasClick={this.onCanvasClick} onDropNote={this.onDropNote} onDropNoteHandle={this.onDropNoteHandle} 
                        song={this.props.song} editor={this.props.editor} 
                        CanvasPosToSequencePos={this.CanvasPosToSequencePos} />
                    </CanvasPanel>
                </SequenceRow>
            </>
        );
    }
}

export default Sequencer;