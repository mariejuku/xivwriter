import React from 'react';
import styled from "styled-components";
import { Container as bContainer, Row as bRow, Col as bCol, Button as bButton, Form as bForm } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemTypes } from './constants';
import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend'
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

const NoteHandleStyle = styled(NoteCol)`
            width:4px;
            background:#0000;
            transition:background .1s;
            border-left:1px solid #fff1;
            cursor:ew-resize;
            
            ${function (props) {
        if (props.direction === 'left') {
            return "left:0;"
        }
        if (props.direction === 'right') {
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
width:${props => (props.$editor.beatsToPixels * props.$note.duration)}px;
height:20px;
overflow:hidden;
line-height:0;
padding:0;

top: ${props => (pitches.indexOf(props.$note.pitch) * 20)}px;
left: ${props => (props.$note.beat * props.$editor.beatsToPixels)}px;

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

&.btn:hover ${NoteHandleStyle} {
    background:#0006;
}
`

const NoteClick = (event, note) => {
    if (event.button == 2) {
        note.track.RemoveNote(note.key);
    }
}

function Note(props) {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.NOTE,
        item: { name: 'note', note: props.note },
        end: (item, monitor) => {
            let dropResult = monitor.getDropResult();
            if (item && dropResult) {
                console.log(dropResult);
                props.onDropNote(props.note,dropResult.sequencePos);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: false })
    }, [])

    if (isDragging) {return <div ref={drag} />}

    return (
        <NoteOuter ref={drag}
            onMouseUp={(event) => { NoteClick(event, props.note) }} $note={props.note} $editor={props.editor} $beat={props.note.beat}>
            <NoteHandle direction={'left'} note={props.note} onDropNoteHandle={props.onDropNoteHandle}/>
            <NoteName>{props.note.pitch}</NoteName>
            <NoteHandle direction={'right'} note={props.note} onDropNoteHandle={props.onDropNoteHandle}/>
        </NoteOuter>
    )
};

export default Note;

function NoteHandle(props) {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.NOTEHANDLE,
        item: { name: 'notehandle', note: props.note, direction: props.direction },
        end: (item, monitor) => {
            let dropResult = monitor.getDropResult();
            if (item && dropResult) {
                props.onDropNoteHandle(props.note,item.direction,dropResult.sequencePos);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: false })
    }, [])

    return (
        <NoteHandleStyle {...props} ref={drag}/>
    )
};

const PreviewNoteOuter = styled(NoteOuter)`
    left:0;
    top:0;
    color:#fff;
    border-color:#ffff;
    background:#3597eb;
    border-radius:3px;
`;

export function PreviewNote(props) {
    return (
        <PreviewNoteOuter $note={props.note} $editor={props.editor}>
            <NoteHandle direction={'left'} note={props.note}/><NoteName>{props.note.pitch}</NoteName><NoteHandle direction={'right'} note={props.note}/>
        </PreviewNoteOuter>
    )
};

export function PreviewNoteHandle(props) {
    return (
        <div style={{width:'2px',height:'20px',background:'red'}} direction={'left'} note={props.note}/>
    )
};

const OutlineNote = styled(NoteOuter)`
    color:#fff;
    border-color:#ffff;
    background:none;
    border-radius:3px;
`;

export function PreviewNoteOutline(props) {
    return (
        <OutlineNote $note={props.note} $editor={props.editor} offset={props.offset}>
        </OutlineNote>
    )
};