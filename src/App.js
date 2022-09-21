import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Soundfont from 'soundfont-player';
//import './soundfont/ffxiv-fixed/electric_guitar_muted-ogg';

//require('./electric_guitar_clean-mp3');
//console.log(MIDI.Soundfont.electric_guitar_clean);
import Player from './Player';
import Song from './Song';

import { Container, Row, Col } from './layout/layout';
import Header from './header';
import Footer from './footer';
import Toolbar from './toolbar';
import Sequencer from "./sequencer";
import instruments from "./instruments";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.audioContext = new AudioContext();
        this.clavinet = undefined;
        this.AppStartup();

        this.state = {
            loadingState: "unloaded",
            tooltip: "Orchestrion Roll",
            song: new Song(this),
            player: new Player(this),
            mouse: {
                left: false
            }
        };
    }

    SetTooltip = (text) => { this.setState({ tooltip:text }); }
    UnsetTooltip = () => {this.setState({ tooltip:"Orchestrion Roll" });}

    MouseDown = () => {this.setState({ mouse: { left: true } })}
    MouseUp = () => {this.setState({ mouse: { left: false } })}

    render() {
        return (
            <>
                <div className='App' onMouseDown={this.MouseDown} onMouseUp={this.MouseUp}>
                    <Container fluid>
                        <Header />
                        <Toolbar song={this.state.song} player={this.state.player} />
                        <Sequencer player={this.state.player} song={this.state.song} mouse={this.state.mouse}/>
                        <Footer tooltip={this.state.tooltip} song={this.state.song} player={this.state.player}/>
                    </Container>
                </div>
            </>
        );
    }

    async AppStartup() {
        this.clavinet = await Soundfont.instrument(this.audioContext, 'http://localhost:3000/instruments/electric_guitar_clean-mp3.js');
        console.log(this.clavinet);
    }
}

export default App;

