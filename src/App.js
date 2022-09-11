import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Soundfont from 'soundfont-player';
//import './soundfont/ffxiv-fixed/electric_guitar_muted-ogg';

//require('./electric_guitar_clean-mp3');
//console.log(MIDI.Soundfont.electric_guitar_clean);

import { Container, Row, Col } from './layout';
import Header from './header';
import Footer from './footer';
import Toolbar from './toolbar';
import Sequencer from "./sequencer";
import instruments from "./instruments";

class Song {
    constructor(app) {
        this.app = app;

        this.name = "song";
        this.bpm = 100;
    }

    changeBPM = (event) => {
        var newBPM = event.target.value;
        console.log(newBPM);
        var validBPM = this.bpm;
        if (!isNaN(newBPM)) { validBPM = newBPM; }
        if (validBPM < 1) (validBPM = 1);

        this.bpm = validBPM;
        this.app.setState({ song: this });
    }

    changeName = (event) => {
        console.log(event.target.value);
        this.name = event.target.value;
        this.app.setState({ song: this });
    }
}

class Player {
    constructor(app) {
        this.app = app;
        this.volume = 50;
        this.audioContext = app.audioContext;
    }

    play = (note) => {
        this.app.clavinet.play(note);
    }

    changeVolume = (event) => {
        console.log(event.target.value);
        this.volume = event.target.value;
        this.app.setState({ player: this });
    }
}

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
            player: new Player(this)
        };
    }

    SetTooltip(text) {
        this.setState({ tooltip:text });
    }

    UnsetTooltip() {
        this.setState({ tooltip:"Orchestrion Roll" });
    }

    render() {
        return (
            <>
                <div className='App'>
                    <Container fluid>
                        <Header />
                        <Toolbar song={this.state.song} player={this.state.player} />
                        <Sequencer player={this.state.player}/>
                        <Footer tooltip={this.state.tooltip}/>
                    </Container>
                </div>
            </>
        );
    }

    async AppStartup() {
        
        this.clavinet = await Soundfont.instrument(this.audioContext, 'http://localhost:3000/contrabass-ogg.js');
        console.log(this.clavinet);
    }
}

export default App;

