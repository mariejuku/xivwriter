import styled from "styled-components";
import { InputGroup, Stack } from 'react-bootstrap';
import Note, { PreviewNote, PreviewNoteHandle, PreviewNoteOutline } from './layout/note';
import { Icon, IconButton, Form, Button, Divider, PianoKey, PianoOctave, Container, Row, Col } from "./layout/layout";
import { faMusic, faSearchPlus, faSearchMinus, faSearchLocation, faEdit, faMousePointer, faEraser, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, memo } from 'react'
import { DndProvider, useDrag, useDragLayer, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes, pitches } from './constants';
import { useState } from "react";

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
`;

const style = {
    height: '12rem',
    width: '12rem',
    paddingTop: '2em',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

const getMousePos = function (canvas, event) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    return {
        x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

const CanvasDropArea = (props) => {
    const GetDragPositions = (item, monitor) => {
        console.log(item);
        let co = monitor.getInitialSourceClientOffset();
        let delta = monitor.getDifferenceFromInitialOffset();
        let mouse = monitor.getClientOffset();
        let elementMovePos = {
            x: co.x + delta.x,
            y: co.y + delta.y
        }
        let sequencePos = props.CanvasPosToSequencePos(
            getMousePos(props.canvas.current, {
                clientX: elementMovePos.x,
                clientY: mouse.y
            })
        );
        return ({ name: 'Canvas', elementMovePos, sequencePos });
    };
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.NOTE, ItemTypes.NOTEHANDLE],
        hover: (item, monitor) => {
            return GetDragPositions(item, monitor);
        },
        drop: (item, monitor) => {
            return GetDragPositions(item, monitor);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (
        <div ref={drop} style={{ ...style }} data-testid="canvas">
            {props.children}
        </div>
    )
}

const SequencerCanvas = props => {
    let song = props.song;
    let editor = props.editor;
    const canvasRef = useRef(null);
    const settings = { keyHeight: 20, beats: 4 }

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
        props.onCanvasClick(event.button, pos);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <SequencerDiv>
                <canvas ref={canvasRef} width="1920" height="740" />
                <CanvasDropArea canvas={canvasRef} CanvasPosToSequencePos={props.CanvasPosToSequencePos}>
                    <CanvasOverlay onClick={onCanvasClick}>
                        {song.tracks.map((track) => track.NotesArray().map((note) =>
                            <Note key={note.key} note={note} editor={editor} onDropNote={props.onDropNote} onDropNoteHandle={props.onDropNoteHandle} />
                        ))}
                        <DragLayerHover snapToGrid={false} editor={editor} />
                        {/* <DragLayerPreview canvas={canvasRef} CanvasPosToSequencePos={props.CanvasPosToSequencePos} song={song} editor={editor} /> */}
                    </CanvasOverlay>
                </CanvasDropArea>
            </SequencerDiv>
        </DndProvider>
    );
}

export default SequencerCanvas;

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
}

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
    if (!initialOffset || !currentOffset) { return { display: 'none' }}
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform,
    }
}

export const DragLayerHover = (props) => {
    const { itemType, isDragging, item, initialOffset, currentOffset } =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }))
    function renderItem() {
        switch (itemType) {
            case ItemTypes.NOTE:
                return <PreviewNote note={item.note} editor={props.editor} />
            case ItemTypes.NOTEHANDLE:
                return <PreviewNoteHandle />
            default:
                return null
        }
    }
    if (!isDragging) {
        return null
    }
    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)} >
                {renderItem()}
            </div>
        </div>
    )
}

export const DragLayerPreview = (props) => {
    const { itemType, isDragging, item, initialOffset, currentOffset } =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }))
    function renderItem() {
        console.log(currentOffset);

        let sequencePos = props.CanvasPosToSequencePos(
            getMousePos(props.canvas.current, {
                clientX: currentOffset.x,
                clientY: currentOffset.y
            })
        );

        item.note.pitch = sequencePos.pitch;
        item.note.beat = sequencePos.beat;

        switch (itemType) {
            case ItemTypes.NOTE:
                return <PreviewNoteOutline note={item.note} offset={currentOffset} editor={props.editor} />
            default:
                return null
        }
    }
    if (!isDragging) { return null }
    return (
        <div>
            {renderItem()};
        </div>
    )
}