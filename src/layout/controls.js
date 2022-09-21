import React from 'react';
import styled from "styled-components";
import { Button as bButton } from 'react-bootstrap';
import { Row, Col } from './layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export const LButton = styled(bButton)`
    overflow: hidden;

    box-shadow: 0 0 10px ${props => props.lit ? `${props.color}8` : `${props.color}0`};

    color: ${props => props.color};
    background-color: ${props => props.background};

    &:hover, &:hover:focus {
        color: ${props => props.overColor};
        background-color: ${props => props.background};

        & svg {
            filter: drop-shadow(0 0 5px ${props => props.overColor}b);
        }
    }
`

export const Button = props => {
    let color = '#c00';
    let overColor = '#fff';
    let background = '#c00';
    let showBackground = true;

    if (props.variant) {
        switch(props.variant) {
            case 'green':
        }
        showBackground = true;
    }

    return (
        <LButton color={color} overColor={overColor} background="#ahh" showBackground={showBackground}>{props.children}</LButton>
    );
}

export const IconButtonContainer = styled(LButton)`
    padding: 0 !important;
	line-height: 0;
	font-size: 1.5em;
    width:40px;
    height:40px;
    box-shadow: inset 0 0 10px #0003;
    
    &.btn-lg {
        height: 80px;
        width: 80px;
        font-size: 4em;
        box-shadow: inset 0 0 30px #0003;
    }    
`

export const SlideButtonContainer = styled(IconButtonContainer)`
font-size:1em;
width:20px;
height:80px;
`

export const IconButton = function IconButton(props) {
    let themeColor = '#ccc';
    let overColor = '#fff';
    let showBackground = false;

    if (props.variant) {
        switch(props.variant) {
            case 'green':
                themeColor = '#0b4';
                overColor = '#0e4';
                break;
            case 'red':
                themeColor = '#b10';
                overColor = '#e10';
                break;
            case 'yellow':
                themeColor = '#fb0';
                overColor = '#fb0';
                break;
            case 'blue':
                themeColor = '#39e';
                overColor = '#7be';
                break;
        }
        showBackground = true;
    }

    let color = themeColor;
    let background = `${themeColor}${showBackground?2:0}`;

    return (
        <IconButtonContainer size={props.size} overColor={overColor} color={color} background={background} onClick={props.onClick} lit={false}><FontAwesomeIcon icon={props.icon} /></IconButtonContainer>
    );
}

export const SliderButton = function SliderButton(props) {
    return (
        <SlideButtonContainer variant={props.variant} size={props.size}><FontAwesomeIcon icon={props.icon} /></SlideButtonContainer>
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