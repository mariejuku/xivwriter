import styled from "styled-components";
import { InputGroup, Stack } from 'react-bootstrap';

import { Container, Row, Col, Icon, IconButton, Form, Button, Divider } from "./layout";
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
                                    <p>Info text</p>
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