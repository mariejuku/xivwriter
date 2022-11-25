import MidiPlayer from 'midi-player-js';
import MidiWriter from 'midi-writer-js';
import Soundfont from 'soundfont-player';
import instruments from '../instruments';
import { Track } from './Track';

export default class Song {
    constructor(app) {
        this.app = app;
        console.log(this.app);

        this.name = "song";
        this.bpm = 100;
        this.timeSignature = 4; //beats per measure

        this.tracks = [];
        this.AddTrack();
        this.AddTrack();
    }

    Update = () => {
        this.app.setState({ song:this });
    }

    AddNote = (trackIndex,pitch,duration,beat) => {
        this.tracks[trackIndex].AddNote(pitch,duration,beat);
        this.app.setState({ song: this });
    }

    EditNote = (trackIndex,noteUniqueKey,newPitch,newBeat,newDuration) => {
        this.tracks[trackIndex].EditNote(noteUniqueKey,newPitch,newBeat,newDuration);
        this.app.setState({ song: this });
        this.tracks[trackIndex].PlayNote(noteUniqueKey);
    }

    RemoveNote = (trackIndex,noteUniqueKey) => {
        this.tracks[trackIndex].RemoveNote(noteUniqueKey);
        this.app.setState({ song: this });
    }

    AddTrack = () => {
        let newTrack = new Track(this,this.tracks.length);
        this.tracks.push(newTrack);
    }

    TrackSetInstrument = (newInstrument,index) => {
        this.tracks[index].instrument = newInstrument;
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