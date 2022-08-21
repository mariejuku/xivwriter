import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Header from './header';
import Toolbar from './toolbar';

class Song {
    constructor() {
        this.name = "song";
        this.bpm = 100;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: new Song()
        };
    }

    changeBPM = (event) => {
		var newBPM = event.target.value;
		console.log(newBPM);
		var validBPM = this.state.song.bpm;

		console.log("heck");

		if (!isNaN(newBPM)) {
			validBPM = newBPM;
		}
		if (validBPM < 1) (validBPM = 1);
		
		var newSong = this.state.song;
		newSong.bpm = validBPM;
		this.setState({
			song:  newSong
		});
	}

    render() {
        return (
            <>
                <div className='App'>
                    <Header />
                    <Toolbar song={this.state.song} changeBPM={this.changeBPM} />
                    <Container fluid>
                        <Row>
                            <Col>1 of 1</Col><Col>1 of 1</Col><Col>1 of 1</Col>
                        </Row>
                        <Row>
                            <Col>1 of 1</Col><Col>1 of 1</Col><Col>1 of 1</Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default App;
