import MidiPlayer from 'midi-player-js';
import MidiWriter from 'midi-writer-js';
import Soundfont from 'soundfont-player';
import instruments from './instruments';

export class Track {
    constructor(song) {
        console.log("new track");

        this.song = song;
        this.name = "track 01";
        this.instrument = instruments.Clarinet;
        this.midiTrack = new MidiWriter.Track();
        this.midiTrack.addInstrumentName("clavinet");

        // Add some notes:
        const note = new MidiWriter.NoteEvent({ pitch: ['C4', 'D4', 'E4'], duration: '4' });
        this.midiTrack.addEvent(note);

        this.midiTrack.addEvent([
            new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
            new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' }),
            new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
            new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' }),
            new MidiWriter.NoteEvent({ pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8' }),
            new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
            new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' })
        ], function (event, index) {
            return { sequential: true };
        });
        // Generate a data URI
        this.write = new MidiWriter.Writer(this.midiTrack);
        
    }
}

export default class Song {
    constructor(app) {
        this.app = app;
        console.log(this.app);

        this.name = "song";
        this.bpm = 100;
        this.timeSignature = 4; //beats per measure

        this.tracks = [
            new Track(this),
            new Track(this),
            new Track(this),
            new Track(this),
            new Track(this),
            new Track(this),
            new Track(this),
            new Track(this)
        ];
    }

    testPlay = (event) => {
        // Initialize player and register event handler
        console.log(this.app);
        console.log(this.app.clavinet);
        console.log(MidiPlayer);
        console.log(MidiPlayer.Player);
        const note = this.app.clavinet.play;
        const Player = new MidiPlayer.Player(function (event) {
            console.log(event);
            note(event.noteName);
        });

        // Load a MIDI file
        const dataUri = this.tracks.clavinet.write.dataUri();
        console.log(dataUri);
        Player.loadDataUri(dataUri);
        Player.play();
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

    changeTimeSignature = (event) => {
        var newSig = event.target.value;
        var validSig = this.timeSignature;
        if (!isNaN(newSig)) { validSig = newSig; }
        if (validSig < 1) (validSig = 1);

        this.timeSignature = validSig;
        this.app.setState({ song: this });
    }

    changeName = (event) => {
        this.name = event.target.value;
        this.app.setState({ song: this });
    }
}