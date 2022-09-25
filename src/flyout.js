import styled from "styled-components";
import { Col, H1, Row } from "./layout/page";

const Shelf = styled.div`
        position:fixed;
        right:-100px;
        padding-right:100px;
        top:0;
        bottom:40px;
        width:500px;

        backdrop-filter: blur(5px);
        background-color:#222e;
        border-radius: 2px;
        border-color: #0004;
        color: #ccc;
        box-shadow: inset 0 0 30px #0006, 0 0 10px #0008;
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

const Flyout = props => {
    return (
        <Shelf>
            <Title>
                <H1>Instruments</H1>
            </Title>
            <Row>
                <Col>
                    {props.children}
                </Col>
            </Row>
        </Shelf>
    );
}

export default Flyout;