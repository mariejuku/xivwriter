import styled from "styled-components";
import { InputGroup, Stack } from 'react-bootstrap';
import Note from './layout/note';
import { Icon, IconButton, Form, Button, Divider, PianoKey, PianoOctave, Container, Row, Col } from "./layout/layout";
import { faMusic, faSearchPlus, faSearchMinus, faSearchLocation, faEdit, faMousePointer, faEraser, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from './constants';

const SequencerDiv = styled.div`
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
overflow:scroll;
`;

const CanvasOverlay = styled.div`
width:1920px;
height:740px;
position:absolute;
top:0;
left:0;
`


const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
  }
  
const Dustbin = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.NOTE,
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
            {isActive ? 'Release to drop' : 'Drag a box here'}
            {props.children}
        </div>
    )
}

const SequencerCanvas = props => {

    let song = props.song;
    let editor = props.editor;

    const canvasRef = useRef(null);

    const settings = {
        keyHeight: 20,
        beats: 4
    }

    const getMousePos = function (canvas, evt, props) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

        return {
            x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }

    const drawOctaves = function (ctx, canvas, props) {
        for (let i = 1; i < 37; i += 12) {
            ctx.strokeStyle = '#0006';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, (i * settings.keyHeight) + 0.5);
            ctx.lineTo(canvas.width, (i * settings.keyHeight) + 0.5);
            ctx.stroke();
            drawKeys(i + 1, ctx, canvas, props);
        }
    }

    const drawKeys = function (j, ctx, canvas, props) {
        ctx.strokeStyle = '#0002';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 11; i++) {
            let k = j + i;
            ctx.moveTo(0, (k * settings.keyHeight) + 0.5);
            ctx.lineTo(canvas.width, (k * settings.keyHeight) + 0.5);
        }
        ctx.stroke();
    }

    const drawMeasures = function (ctx, canvas, props) {
        let subdivisions = props.editor.subdivisions;
        let subWidth = props.editor.beatsToPixels / subdivisions;
        let beatsPerMeasure = props.song.timeSignature;
        let beatWidth = props.editor.beatsToPixels;
        let measureWidth = props.editor.beatsToPixels * beatsPerMeasure;
        //sub-beat
        if (subdivisions <= 16) {
            ctx.strokeStyle = '#0002';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i * subWidth < canvas.width; i++) {
                if (i % subdivisions != 0) {
                    ctx.moveTo((i * subWidth) + 0.5, 0);
                    ctx.lineTo((i * subWidth) + 0.5, canvas.height);
                }
            }
            ctx.stroke();
        }
        //beat 
        ctx.strokeStyle = '#0006';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i * beatWidth < canvas.width; i++) {
            if (i % (beatsPerMeasure) != 0) {
                ctx.moveTo((i * beatWidth) + 0.5, 0);
                ctx.lineTo((i * beatWidth) + 0.5, canvas.height);
            }
        }
        ctx.stroke();
        //measure
        ctx.strokeStyle = '#0006';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i * measureWidth < canvas.width; i++) {
            ctx.moveTo((i * measureWidth) + 0.5, 0);
            ctx.lineTo((i * measureWidth) + 0.5, canvas.height);
        }
        ctx.stroke();
    }

    const draw = function (ctx, canvas, props) { drawOctaves(ctx, canvas, props); drawMeasures(ctx, canvas, props); }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw(context, canvas, props)
    }, [draw])

    const onCanvasClick = function (event) {
        const canvas = canvasRef.current;
        let pos = getMousePos(canvas, event);
        props.onCanvasClick(event.button, event);
    }

    const onCanvasMove = function (event) {
        const canvas = canvasRef.current;
        let pos = getMousePos(canvas, event);
        console.log(`Mouse position update. New pos: ${pos}`)
        props.onCanvasMove(event.button, pos, event);
    }

    const onMoveNote = function (event, note) {
        console.log('move note pos:');
        console.log(props.pos);
        song.MoveNote(note.track.index, props.pos.pitch, props.pos.beat);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <SequencerDiv>
                <canvas ref={canvasRef} width="1920" height="740" />
                <Dustbin>
                <CanvasOverlay onMouseMove={onCanvasMove} onClick={onCanvasClick}>

                    {song.tracks.map((track) => track.NotesArray().map((note) =>
                        <Note key={note.key} note={note} editor={editor} onMoveNote={(event) => onMoveNote(event, note)} />
                    ))}


                </CanvasOverlay>
                </Dustbin>
            </SequencerDiv>
        </DndProvider>
    );
}

export default SequencerCanvas;