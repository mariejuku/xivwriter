import styled from "styled-components";
import { InputGroup, Stack } from 'react-bootstrap';
import { Form, Row, Col } from "./layout/layout";
import { Button, IconButton, SliderButton, Divider } from './layout/controls'
import { faMusic, faSearchPlus, faSearchMinus, faSearchLocation, faEdit, faMousePointer, faEraser, faPlayCircle, faCaretRight, faCopy, faCut, faPaste, faBorderStyle, faVolumeHigh, faVolumeLow, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

const Insert = styled.div`
width:120px;
height:80px;
box-shadow:inset 0 0 6px #000000;
background:#fff2;
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
        var player = this.props.player;
        return (
                <Row>
                    <Col xs="auto">
                        <Stack direction="horizontal" gap={0}>
                            <IconButton variant="green" icon={faPlayCircle} size="lg" onClick={function() {
                                console.log("clikc");
                                player.play();
                            }}/>
                            <IconButton variant="red" icon={faPlayCircle} size="lg" />
                            <IconButton variant="yellow" icon={faPlayCircle} size="lg" />
                            <IconButton variant="blue" icon={faPlayCircle} size="lg" />
                            <SliderButton icon={faGear} />
                            <SliderButton icon={faCaretRight} />
                            <Col xs="auto">
                                <Insert/>
                            </Col>
                            <Stack direction="vertical" gap={0}>
                                <Stack direction="horizontal" gap={0}>
                                    <Col sm="auto">
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMusic} /> <i>BPM</i></InputGroup.Text>
                                            <Form.Control type="number" value={song.bpm} placeholder={song.bpm} className="bpm" onChange={song.changeBPM} />
                                        </InputGroup>
                                    </Col>
                                    <Divider />
                                    <Col sm="auto">
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMusic} /> <i>Name</i></InputGroup.Text>
                                            <Form.Control className="songName" value={song.name} placeholder="Song Name" onChange={song.changeName}/>
                                        </InputGroup>
                                    </Col>
                                </Stack>
                                <Stack direction="horizontal" gap={0}>
                                    <IconButton icon={faEdit} />
                                    <IconButton icon={faMousePointer} />
                                    <IconButton icon={faEraser} />
                                    <Divider />
                                    <IconButton icon={faCopy} />
                                    <IconButton icon={faCut} />
                                    <IconButton icon={faPaste} />
                                    <IconButton icon={faBorderStyle} />
                                    {/* <Divider />
                                    <IconButton icon={faSearchLocation} />
                                    <IconButton icon={faSearchMinus} />
                                    <IconButton icon={faSearchPlus} />
                                    <Divider />
                                    <IconButton icon={faVolumeHigh} />
                                    <Form.Range value={player.volume} onChange={player.changeVolume}/>
                                    <Divider />
                                    <Button disabled size="sm">Heck</Button>
                                    <Button>Heck</Button>

                                    <Button variant="green">Heck</Button> */}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Col>
                </Row>
        );
    }
}

export default Toolbar;

