import React from 'react';
import styled from "styled-components";
import { Button as bButton } from 'react-bootstrap';
import { Row, Col } from './layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCaretLeft, faCaretRight, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import image from '../icons/bassDrum.png';

export const LButton = styled(bButton)`
    overflow: hidden;

    &, &:focus {
        color: ${props => props.color};
        background-color: ${props => props.background};
        border-color: ${props => props.$lit ? `#0004` : `#0000`};
        box-shadow: ${props => props.$lit 
            ? `inset 0 0 10px #0004, 0 0 10px ${props.$overBackground}8`
            : `inset 0 0 10px #0000, 0 0 10px ${props.$overColor}0`};
    }

    &:hover, &:hover:focus {
        color: ${props => props.$overColor};
        background-color: ${props => props.$overBackground};
        border-color: #0003;
        box-shadow: ${props => props.$lit 
            ? `inset 0 0 10px #0004, 0 0 10px ${props.$overBackground}`
            : `inset 0 0 10px #0004, 0 0 10px ${props.$overColor}2`};
        
        & svg {
            ${props => props.$lit 
            ? `filter: drop-shadow(0 0 5px ${props.$overColor}0);`
            : `filter: drop-shadow(0 0 5px ${props.$overColor}8);`
            }
        }
    }

    &:active, &:hover:active, &:hover:focus:active {        
        ${props => props.$lit 
        ? `background-color: ${props.$overBackground}a;`
        : `border-color: ${props.$overColor}8;`}
    }
`

export const Button = props => {
    let litColor = '#ccc'
    let litColorOver = '#fff';
    let unlitColor = '#333';
    let unlitColorOver = '#fff';
    let showBackground = props.showBackground;

    if (props.variant) {
        switch(props.variant) {
            case 'green':
                litColor = '#0b4';
                litColorOver = '#0e4';
                break;
            case 'red':
                litColor = '#b10';
                litColorOver = '#e10';
                break;
            case 'yellow':
                litColor = '#fb0';
                litColorOver = '#fb0';
                break;
            case 'blue':
                litColor = '#39e';
                litColorOver = '#7be';
                break;
        }
        showBackground = true;
    }

    let color = litColor;
    let overColor = litColorOver;
    let background = `${showBackground?litColor:unlitColor}${showBackground?2:0}`;
    let overBackground = `${litColorOver}${showBackground?4:2}`;

    if (props.lit) {
        color = unlitColor;
        overColor = unlitColor;
        if (props.size === 'lg') {
            color = `#222`;
            overColor = `${unlitColor}c`;
        }
        background = litColor;
        overBackground = litColorOver;
    } 

    return (
        <LButton color={color} $overColor={overColor} background={background} $overBackground={overBackground} 
        onClick={props.onClick} size={props.size} $lit={props.lit}>{props.children}</LButton>
    );
}

export const IconButtonContainer = styled(LButton)`
    padding: 0 !important;
	line-height: 0;
	font-size: 1.5em;
    width:40px;
    height:40px;
    
    &.btn-lg {
        height: 80px;
        width: 80px;
        font-size: 4em;
    }    
`

export const SlideButtonContainer = styled(IconButtonContainer)`
font-size:1em;
width:20px;
height:100%;
`

export const IconButton = function IconButton(props) {
    let litColor = '#ccc'
    let litColorOver = '#fff';
    let unlitColor = '#333';
    let unlitColorOver = '#fff';
    let showBackground = props.showBackground;

    if (props.variant) {
        switch(props.variant) {
            case 'green':
                litColor = '#0b4';
                litColorOver = '#0e4';
                break;
            case 'red':
                litColor = '#b10';
                litColorOver = '#e10';
                break;
            case 'yellow':
                litColor = '#fb0';
                litColorOver = '#fb0';
                break;
            case 'blue':
                litColor = '#39e';
                litColorOver = '#7be';
                break;
        }
        showBackground = true;
    }

    let color = litColor;
    let overColor = litColorOver;
    let background = `${showBackground?litColor:unlitColor}${showBackground?2:0}`;
    let overBackground = `${litColorOver}${showBackground?4:2}`;

    if (props.lit) {
        color = unlitColor;
        overColor = unlitColor;
        if (props.size === 'lg') {
            color = `#222`;
            overColor = `${unlitColor}c`;
        }
        background = litColor;
        overBackground = litColorOver;
    } 

    return (
        <IconButtonContainer color={color} $overColor={overColor} background={background} $overBackground={overBackground} 
        onClick={props.onClick} size={props.size} $lit={props.lit}><FontAwesomeIcon icon={props.icon} /></IconButtonContainer>
    );
}

export const SliderButton = function SliderButton(props) {
    let leftHand = false;
    if (props.leftHand != undefined) { leftHand = props.leftHand; }

    let open = false;
    if (props.open != undefined) { open = props.open; }

    let icon = (leftHand ? !open : open) ? faCaretLeft : faCaretRight;

    if (props.icon != undefined) { icon = props.icon; }
    
    return (
        <SlideButtonContainer variant={props.variant} size={props.size} onClick={props.onChange}><FontAwesomeIcon icon={icon} /></SlideButtonContainer>
    );
}

export function Divider() {
    return (
        <DividerOuter>
            <DividerInner />
        </DividerOuter>
    );
}

const DividerOuter = styled.div`
width:40px;
height:40px;
text-align:center;
margin:0px;
padding:8px;
`

const DividerInner = styled.div`
background:#fff6;
width:1px;
height:100%;
margin:auto;
`

export const Text = props => {
    return (
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
    );
}

export const ImageButtonContainer = styled(LButton)`
    padding: .5em !important;
	line-height: 0;
	font-size: 1.5em;
    width:100%;
    height:auto;
`

export const ImageButton = props => {
    return (
        <ImageButtonContainer>
            <Row>
                <Col xs="auto">
                    <img src={props.image}/>
                </Col>
                <Col>{props.children}</Col>
            </Row>
        </ImageButtonContainer>
    );
}

