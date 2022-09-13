import styled from "styled-components";
import { InputGroup, Stack } from 'react-bootstrap';
import Note from './layout/note';
import { Icon, IconButton, Form, Button, Divider, PianoKey, PianoOctave,Container, Row, Col } from "./layout/layout";
import { faMusic, faSearchPlus, faSearchMinus, faSearchLocation, faEdit, faMousePointer, faEraser, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect } from 'react'

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

const SequencerCanvas = props => {
  
    const canvasRef = useRef(null)

    const settings = {
        keyHeight:20,
        width:40,
        beats:4
    }

    const getMousePos = function(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
          scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
      
        return {
          x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }

    const drawOctaves = function(ctx,canvas) {
        for (let i = 1; i < 37; i+=12) {
            ctx.strokeStyle = '#0006';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, (i*settings.keyHeight) + 0.5);
            ctx.lineTo(canvas.width, (i*settings.keyHeight) + 0.5);
            ctx.stroke();
            drawKeys(i+1,ctx,canvas);
        }
        
    }

    const drawKeys = function(j,ctx,canvas) {
        ctx.strokeStyle = '#0002';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 11; i++) {
            let k = j+i;
            ctx.moveTo(0, (k*settings.keyHeight) + 0.5);
            ctx.lineTo(canvas.width, (k*settings.keyHeight) + 0.5);
        }
        ctx.stroke();
    }

    const drawMeasures = function(ctx,canvas) {
        ctx.strokeStyle = '#0002';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i++) {
            if (i % 4 != 0) {
                ctx.moveTo((i*settings.width) + 0.5, 0);
                ctx.lineTo((i*settings.width) + 0.5,canvas.height);
            }
        }
        ctx.stroke();
        ctx.strokeStyle = '#0006';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i++) {
            if (i % 4 === 0) {
                ctx.moveTo((i*settings.width) + 0.5, 0);
                ctx.lineTo((i*settings.width) + 0.5,canvas.height);
            }
        }
        ctx.stroke();
    }

    const draw = function(ctx,canvas,props) { drawOctaves(ctx,canvas); drawMeasures(ctx,canvas); }
    
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height);
      //Our draw come here
      draw(context,canvas)
    }, [draw])

    const onCanvasClick = function(event) {
        const canvas = canvasRef.current;
        let pos = getMousePos(canvas, event);
        console.log(pos);
    }
    
    return (
        <SequencerDiv>
        <canvas ref={canvasRef} width="1920" height = "740" {...props} onClick={onCanvasClick}/>
        <CanvasOverlay onClick={onCanvasClick}>
            <Note style={{
                left:"5px",
                zoom:"8"}}/>
            <Note style={{
                left:"40px",
                top:"160px"
            }}/>
            <Note style={{
                width:"80px",
                left:"80px",
                top:"160px"
            }}/>
            <Note style={{
                left:"160px",
                top:"160px"
            }}/>
            </CanvasOverlay>
            
        </SequencerDiv>
    );
    
  }

export default SequencerCanvas;