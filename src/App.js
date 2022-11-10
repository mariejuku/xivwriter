import styled, { keyframes } from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Soundfont from 'soundfont-player';
import Editor from './Editor';
import Song, { Track } from './Classes/Song';

import { H1, Overlay } from './layout/page';
import { Container, Col } from './layout/layout';
import { Button, IconButton, IconButtonContainer, SliderButton, InstrumentButton, ImageButtonContainer, ImageButton } from './layout/controls'
import { faPlayCircle, faYinYang, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from './header';
import Footer from './footer';
import Toolbar from './toolbar';
import Sequencer from "./Sequencer";
import instruments from "./instruments";
import { Flyout, Shelf, Sidebar } from "./flyout";
import { TrackSettings } from "./Pages/TrackSettings";
import { InstrumentSelect } from "./Pages/InstrumentSelect";

const Row = styled.div`
display: flex;
flex-direction: row;
justify-content: stretch;
align-content: stretch;
flex-grow: ${props => props.$grow ? 1 : 0};
`;

const rotate = keyframes`
  from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}`;

const Spinner = styled(FontAwesomeIcon)`
    width:80px;
    height:80px;
    color:#ccc;
    filter: drop-shadow(0 0 5px #fff4);
    animation: ${rotate} .5s linear infinite;
`

const LauncherDiv = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    background: #2224;
    display:inline-flex;
    box-shadow: inset 0 0 1080px #000f;
    justify-content:center;
    align-items:center;

    & ${IconButtonContainer} {
        width:100%;
        height:100%;
    }
`;

const Launcher = props => {
    return (
        <LauncherDiv>
            {props.loadingState === 'unloaded'
                ? <IconButton icon={faPlayCircle} size="lg" onClick={props.onClick} />
                : <Spinner icon={faYinYang} />
            }
        </LauncherDiv>);
}

const OverlayDiv = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    background: #2221;
    backdrop-filter: blur(5px);
    display:inline-flex;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.clavinet = undefined;

        this.tools = {
            "edit": {
                cursor: "default"
            }
        }

        this.state = {
            dismissable: false,
            loadingState: "unloaded",
            tooltip: "Orchestrion Roll",
            sidebarOpen: false,
            flyoutOpen: false,
            flyoutCallback: () => { },
            song: new Song(this),
            editor: new Editor(this),
            mouse: {
                left: false
            },
            tool: "edit"
        };
    }

    SetTooltip = (text) => { this.setState({ tooltip: text }); }
    UnsetTooltip = () => { this.setState({ tooltip: "Orchestrion Roll" }); }

    SetTool = (tool) => { this.setState({ tool: tool }) };

    MouseDown = () => { this.setState({ mouse: { left: true } }) }
    MouseUp = () => { this.setState({ mouse: { left: false } }) }
    resize = (event) => { console.log(event); event.preventDefault(); }

    SetSidebar = (open) => { this.setState({ sidebarOpen: open }) };
    ToggleSidebar = () => { this.SetSidebar(!this.state.sidebarOpen) };

    DismissPopout = () => {
        if (this.state.dismissable) {
            this.setState({ flyoutOpen: false, dismissable: false, flyoutCallback: () => { } });
        }
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            const xPos = event.pageX + "px";
            const yPos = event.pageY + "px";
            //
          });
    }

    sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    Load = async () => {
        this.setState({ loadingState: 'loading' });

        this.audioContext = new AudioContext();
        this.clavinet = await Soundfont.instrument(this.audioContext, 'http://localhost:3000/instruments/electric_guitar_clean-mp3.js');

        this.setState({ loadingState: 'loaded' });
    }

    render() {
        console.log(this.state);
        return (
            <>
                <div className='App' onMouseDown={this.MouseDown} onMouseUp={this.MouseUp}>
                    <Container fluid>
                        <Row $grow={true}>
                            <Col xs={this.state.sidebarOpen ? 6 : 12} style={{}}>
                                <Row $grow={true}>
                                    <Col style={{width:0, overflowX:"hidden"}}>
                                        <Header />
                                        <Toolbar song={this.state.song} editor={this.state.editor} tool={this.state.tool} SetTool={this.SetTool} />
                                        <Sequencer song={this.state.song} editor={this.state.editor} mouse={this.state.mouse} />
                                    </Col>
                                    <Col xs={"auto"} style={{ zIndex: 1 }}>
                                        <SliderButton leftHand onChange={this.ToggleSidebar} open={this.state.sidebarOpen} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Sidebar title={"Tracks"}>
                                    {(this.state.song.tracks != undefined) ? <></> : this.state.song.tracks.map((track, index) =>
                                        <TrackSettings key={track.key} index={index} track={track} editor={this.state.editor} song={this.state.song} />)
                                    }
                                </Sidebar>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Footer tooltip={this.state.tooltip} song={this.state.song} editor={this.state.editor} />
                            </Col>
                        </Row>
                    </Container>

                </div>
                {this.state.dismissable == true ? <OverlayDiv onClick={this.DismissPopout} /> : ''}
                <Flyout open={this.state.flyoutOpen}>
                    <InstrumentSelect callback={this.state.flyoutOpen ? this.state.flyoutCallback
                        : () => { }} />
                </Flyout>
                {this.state.loadingState !== 'loaded' ? <Launcher loadingState={this.state.loadingState} onClick={this.Load} /> : ''}
            </>
        );
    }
}



export default App;

