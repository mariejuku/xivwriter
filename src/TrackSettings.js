import handleTexture from './images/handleTexture.png';
import { faEraser, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { Col, Form, H1, Row } from "./layout/page";
import { Button, IconButton, ImageButton } from './layout/controls';
import Editor from './Editor';

const TrackWindow = styled.div`
padding:1em;
border-radius:1em;
backdrop-filter: blur(5px);
background-color:#222e;
border-color: #0004;
color: #ccc;
box-shadow: inset 0 -6px 10px #fff1, inset 0 10px 10px #fff4, 0 0 10px #0008;
overflow:hidden;
margin:.5em;
`

const TrackHandle = styled(Col)`
border-right: 1px solid #fff2;
margin: -16px 0 -16px -16px;
margin-right:16px;
background: url(${handleTexture});
background-color:#fff1;
overflow:hidden;
position:relative;
&:hover {
    background-color:#fff2;
}
`;

const TrackNumber = styled(H1)`
position: absolute;
font-size: 12vw;
bottom: 0px;
color: #fff4;
left: -0.1em;
line-height: 50%;
margin: 0;
display: inline-block;
`;

const InstrumentButton = props => {
    return (
        <ImageButton image={props.instrument.image} variant="green" onClick={props.onClick}>{props.instrument.name}</ImageButton>
    );
}

export const TrackSettings = props => {
    let track = props.track;

    return (
        <Row>
            <Col>
                <TrackWindow>
                    <Row>
                        <TrackHandle xs={2} >
                            <TrackNumber>{props.index}</TrackNumber>
                        </TrackHandle>
                        <Col>
                            <InputGroup>
                                <InputGroup.Text><i>Track Name</i></InputGroup.Text>
                                <Form.Control value={track.name} placeholder="Track Name" />
                                <IconButton icon={faEraser} />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text><i>Instrument</i></InputGroup.Text>
                                <Form.Control value={track.instrument ? track.instrument.name : "No Instrument"} placeholder="Instrument" />
                                <Button lit>Choose</Button>
                            </InputGroup>
                            Instrument
                            <InstrumentButton instrument={track.instrument} onClick={props.editor.OpenFlyout} />
                            <InputGroup>
                                <InputGroup.Text><i>Export this track</i></InputGroup.Text>
                                <Form.Switch></Form.Switch>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text><i>Track Name</i></InputGroup.Text>
                                <Form.Control value={track.name} placeholder="Track Name" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text><i>Track Name</i></InputGroup.Text>
                                <Form.Control value={track.name} placeholder="Track Name" />
                            </InputGroup>
                        </Col>
                    </Row>
                </TrackWindow>
            </Col>
        </Row>
    );
}

