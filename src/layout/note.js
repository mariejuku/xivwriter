import React from 'react';
import styled from "styled-components";
import { Container as bContainer, Row as bRow, Col as bCol, Button as bButton, Form as bForm } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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


const Note = props => (
    <NoteOuter style={props.style}>
        <NoteHandle left /><NoteName>C6</NoteName><NoteHandle right />
    </NoteOuter>
);

export default Note;