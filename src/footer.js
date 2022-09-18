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
                                            <Form.Control className="playerGrid" value={"1/"+this.props.player.gridValue} onChange={this.props.player.changeGrid}/>
                                        </InputGroup>
                                    </Col>
                                    <DropdownButton as={ButtonGroup} title="a" >
                                        <Dropdown.Item eventKey="1">1/2</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">1/3</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">1/4
                                        Active Item
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                    </DropdownButton>
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