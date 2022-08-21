import styled from "styled-components";
import { Container, Row, Col, InputGroup, Stack } from 'react-bootstrap';

import { Icon, IconButton, Form, Button } from "./layout";
import { faMusic, faSearchPlus, faSearchMinus, faSearchLocation, faEdit, faMousePointer, faEraser, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';


const TCol = styled(Col)`
padding:0;
`

function Divider() {
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

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        console.log(event.target.value);
    }

    render() {
        var song = this.props.song;
        return (
            <Container fluid >
                <Row>
                    <TCol xs="auto">
                        <Stack direction="horizontal" gap={0}>
                            <IconButton variant="green" icon={faPlayCircle} size="lg" />
                            <Stack direction="vertical" gap={0}>
                                <Stack direction="horizontal" gap={0}>
                                    <Col sm="auto">
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMusic} /> <i>BPM</i></InputGroup.Text>
                                            <Form.Control type="number" value={song.bpm} placeholder={song.bpm} className="bpm" onChange={this.props.changeBPM} />
                                        </InputGroup>
                                    </Col>
                                    <Divider />
                                    <Col sm="auto">
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMusic} /> <i>Name</i></InputGroup.Text>
                                            <Form.Control className="songName" />
                                        </InputGroup>
                                    </Col>

                                </Stack>
                                <Stack direction="horizontal" gap={0}>
                                    <IconButton icon={faEdit} />
                                    <IconButton icon={faMousePointer} />
                                    <IconButton icon={faEraser} />
                                    <Divider />
                                    <IconButton icon={faSearchLocation} />
                                    <IconButton icon={faSearchMinus} />
                                    <IconButton icon={faSearchPlus} />
                                    <Divider />
                                    <Button disabled size="sm">Heck</Button>
                                    <Button>Heck</Button>

                                    <Button variant="green">Heck</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </TCol>
                </Row>
            </Container>
        );
    }
}

export default Toolbar;

