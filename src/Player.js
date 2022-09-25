import MidiPlayer from 'midi-player-js';
import Soundfont from 'soundfont-player';

export default class Player {
    constructor(app) {
        this.app = app;
        this.audioContext = app.audioContext;
    }

    play = (noteEvent) => {
        console.log(noteEvent);
    }

    changeVolume = (event) => {
        this.volume = event.target.value;
        this.app.setState({ player: this });
    }
}