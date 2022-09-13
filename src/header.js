import styled from "styled-components";
import { Container, Row, Col } from './layout/page';

import { H1 } from './layout/page';

function Header() {
    return (
        <HRow>
            <Col>
                <H1> Orchestrion Roll </H1>
            </Col>
        </HRow>
    );
}

export default Header;

const HRow = styled(Row)`
padding:1em 2em !important;
background: #25a;
color:white;
& h1 {
    margin-bottom:0;
}
`;