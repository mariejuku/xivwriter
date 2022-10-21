import React from "react";
import styled from "styled-components";
import { Col, Container, H1, Row } from "./layout/page";

const FlyoutDiv = styled.div`
    transition:right .4s;
    position:fixed;
    right: ${props => props.$open ? `-100px` : `-700px`};
    padding-right:100px;
    top:0;
    bottom:40px;
    width:500px;
`

export const Shelf = styled.div`
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    backdrop-filter: blur(5px);
    background-color:#222e;
    border-radius: 2px;
    border-color: #0004;
    color: #ccc;
    box-shadow: inset 0 0 30px #0006, 0 0 10px #0008;
    display:flex;
    flex-direction:column;
`;

const Title = styled.div`
padding: 1em 2em;
text-align:center;
background: #ccc;
color:#333;
${H1} {
    margin:0 !important;   
}
`

const SidebarDiv = styled.div`
position:relative;
height:100%;
`

export class Flyout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            callback: null
        }
    }

    render() {
        return (
            <FlyoutDiv $open={this.props.open}>
            <ButtonWindow>
                {this.props.children}
            </ButtonWindow>
            </FlyoutDiv>
        );
    }
}

export const Sidebar = props => {
    return (
        <SidebarDiv>
            <ButtonWindow title={props.title}>
                {props.children}
            </ButtonWindow>
        </SidebarDiv>
    );
}

export const ButtonWindow = props => {
    return (
        <Shelf>
            <Row>
                <Col>
                    <Title>
                        <H1>{props.title}</H1>
                    </Title>
                </Col>
            </Row>
            <Row style={{ overflowY: "scroll" }}>
                <Col>
                    {props.children}
                </Col>
            </Row>
        </Shelf>
    );
}