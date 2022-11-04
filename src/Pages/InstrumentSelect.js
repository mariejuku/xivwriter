import handleTexture from './../images/handleTexture.png';
import { faEraser, faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { Col, Form, H1, Raised, Row } from "../layout/page";
import { Button, IconButton, ImageButton, InstrumentButton } from '../layout/controls';
import Editor from '../Editor';
import instruments from '../instruments';

export const InstrumentSelect = props => {
    return (
        <Row>
            <Col>
                {Object.values(instruments).map((instrument, index) =>
                    <Row key={instrument.name}><Col>
                        <InstrumentButton  instrument={instrument} onClick={() => props.callback(instrument)} />
                    </Col></Row>
                )}
            </Col>
        </Row>
    );
}

