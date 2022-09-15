import React from 'react';
import styled from "styled-components";
import { Button as bButton } from 'react-bootstrap';
import { Row, Col } from './layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export const LButton = styled(bButton)`
    overflow: hidden;

    box-shadow: 0 0 10px ${props => props.lit ? "#ddd8" : "#ddd0"};     

    color: ${props => props.color};
    background-color: ${props => props.background} ${props => props.showBackground ? `4` : `2`};

    &:hover, &:hover:focus {
        color: ${props => props.overColor};
        background-color: ${props => props.overBackground};

        & svg {
            filter: drop-shadow(0 0 5px #fff8);
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
        <LButton color={color} overColor={overColor} background={background} showBackground={showBackground}>{props.children}</LButton>
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
height:80px;
`

export const IconButton = function IconButton(props) {
    return (
        <IconButtonContainer variant={props.variant} size={props.size} onClick={props.onClick} lit={false}><FontAwesomeIcon icon={props.icon} /></IconButtonContainer>
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