import styled from "styled-components";
import { Container, Row, Col, Button as bButton, Form as bForm } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export const H1 = styled.h1`
font-family:'Roboto', sans-serif;
font-weight:300;
font-size:3em;
`


export const Button = styled(bButton)`

`

export const IconButtonContainer = styled(Button)`
padding: 0 !important;
	text-align: center;
	vertical-align: middle;
	border-radius: 2px;
	background-color: #fff0;
	border-color: #0000;
	color: #ccc;
	line-height: 0;
	overflow: hidden;
	font-size: 1.5em;
width:40px;
height:40px;

&.btn-lg {
	height: 80px;
	width: 80px;
	font-size: 4em;
}
`

export const IconButton = function IconButton(props) {
    return (
        <IconButtonContainer variant={props.variant} size={props.size}><FontAwesomeIcon icon={props.icon}/></IconButtonContainer>
    );
}

export const Form = {
    Control: styled(bForm.Control)``,
    Text: styled(bForm.Text)``,
    Label: styled(bForm.Label)``
}