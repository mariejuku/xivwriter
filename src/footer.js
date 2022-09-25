import styled from "styled-components";
import { InputGroup, Stack, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Container, Row, Col, Icon, IconButton, Form, Button, Divider, Text } from "./layout/layout";
import { faMusic, faSearchPlus, faSearchMinus, faSearchLocation, faEdit, faMousePointer, faEraser, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
                <Row>
                    <Col xs="auto">
                            <Stack direction="vertical" gap={0}>
                                <Stack direction="horizontal" gap={0}>

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
                                    <Col sm="auto">
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMusic} /> <i>Grid</i></InputGroup.Text>
                                            <Form.Control className="playerGrid" value={this.props.editor.gridValue} onChange={this.props.editor.changeGrid}/>
                                        </InputGroup>
                                    </Col>
                                    <Col sm="auto">
                                    <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMusic} /> <i>Beats per measure</i></InputGroup.Text>
                                            <Form.Control type="number" value={this.props.song.timeSignature} onChange={this.props.song.changeTimeSignature} className="timeSignature"/>
                                        </InputGroup>
                                    </Col>
                                    <Divider />
                                    <Text>{this.props.tooltip}</Text>
                                </Stack>
                            </Stack>
                    </Col>
                </Row>
        );
    }
}

export default Footer;

const HContainer = styled(Container)`
padding:2em !important;
background: #25a;
color:white;
`;