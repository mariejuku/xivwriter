import React from 'react';
import styled from "styled-components";
import { Container as bContainer, Row as bRow, Col as bCol, Button as bButton, Form as bForm } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const pitches = [
    'C6',
    'B5', 'A#5', 'A5', 'G#5', 'G5', 'F#5', 'F5', 'E5', 'D#5', 'D5', 'C#5', 'C5',
    'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4',
    'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3'
];

const NoteCol = styled.div`
            display:inline-block;
            position:absolute;
            top:0;
            bottom:0;
            height:100%;
            `

const NoteHandle = styled(NoteCol)`
            width:2px;
            background:#0000;
            transition:background .1s;
            border-left:1px solid #fff1;
            
            ${function (props) {
        if (props.left) {
            return "left:0;"
        }
        if (props.right) {
            return "right:0;"
        }
    }}
`
const NoteName = styled(NoteCol)`
line-height:normal;
left:4px;
right:0px;
overflow:hidden;
text-align:left;
font-size:.95em;
`

const NoteOuter = styled(bButton)`
position:absolute;
width:40px;
height:20px;
overflow:hidden;
line-height:0;
padding:0;

top: ${props => (pitches.indexOf(props.$pitch) * 20)}px;
left: ${props => (props.$beat * props.$editor.beatsToPixels)}px;

border-radius:4px 8px 8px 4px;
transition:border-radius .1s;

background:#3597eb;
color:#fff;

&.btn:focus, &.btn:active, &.btn:active:focus, &.btn:hover:active, &.btn:hover:focus {
    color:#fff;
    border-color:#ffff;
    background:#3597eb;
}

&.btn:hover {
    background:#3597eb;
    border-color:#fff0;
    border-radius:3px;
}

&.btn:hover ${NoteHandle} {
    background:#0006;
}
`

const NoteClick = (event,note) => {
    if (event.button == 2) {
        note.track.RemoveNote(note.GetUniqueRollKey());
    }
}

const Note = props => {
    
    return (
        <NoteOuter onMouseUp={(event) => {NoteClick(event,props.note)}} $pitch={props.note.pitch} $editor={props.editor} $beat={props.note.beat} style={props.style}>
            <NoteHandle left /><NoteName>{props.note.pitch}</NoteName><NoteHandle right />
        </NoteOuter>
    )
};

export default Note;