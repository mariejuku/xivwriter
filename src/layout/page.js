import React from 'react';
import styled from "styled-components";
import { Container as bContainer, Row as bRow, Col as bCol, Button as bButton, Form as bForm } from 'react-bootstrap';

export const Container = styled(bContainer)`
padding:0;
display:flex;
flex-direction:column;
flex-grow:1;
`
export const Row = styled(bRow)`
margin-left:0;
margin-right:0;
flex-grow:0;
`
export const Col = styled(bCol)`
padding-left:0;
padding-right:0;
`

export const Form = {
    Control: styled(bForm.Control)``,
    Text: styled(bForm.Text)``,
    Label: styled(bForm.Label)``,
    Range: styled(bForm.Range)`
    width:160px;
    `
}

export const H1 = styled.h1`
font-family:'Hingashi Extended', sans-serif;
font-weight:300;
font-size:3em;
font-style:italic;
`