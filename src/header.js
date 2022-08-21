import styled from "styled-components";
import { Container, Row, Col } from 'react-bootstrap';

import { H1 } from './layout';

function Header() {
    return (
        <HContainer fluid>
            <Row>
                <Col>
                    <H1> XIV Writer </H1>
                </Col>
            </Row>
        </HContainer>
    );
}

export default Header;

const HContainer = styled(Container)`
padding:2em !important;
background: #25a;
color:white;
`;