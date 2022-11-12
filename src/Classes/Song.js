import MidiPlayer from 'midi-player-js';
import MidiWriter from 'midi-writer-js';
import Soundfont from 'soundfont-player';
import instruments from '../instruments';

export class NoteData {
    constructor(track, beat, pitch, duration) {
        this.track = track;
        this.beat = beat;
        this.pitch = pitch;
        this.duration = duration;
        this.key = Date.now();

        console.log(`New note: ${pitch}, beat:${beat}, key:${this.key}`);
    }

    GetRollPosition() {
        return `${this.pitch},${this.beat}`;
    }
}

export class Track {
    constructor(song, index) {
        console.log("new track");

        this.index = index;
        this.song = song;
        this.app = song.app;
        this.name = `Track ${index+1}`;
        this.instrument = instruments.Clarinet;
        this.midiTrack = new MidiWriter.Track();
        this.midiTrack.addInstrumentName("clavinet");
        this.notes = {};
        this.notesByPosition = {};
        this.key = `${index}-${this.instrument.name}-${Date.now()}`;

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

        console.log(this.midiTrack);
    }

    NotesArray = () => {
        return Object.values(this.notes);
    }

    SetInstrument = (newInstrument) => {
        this.instrument = newInstrument;
        this.app.DismissPopout();
    }

    AddNote = (pitch, duration, beat) => {
        let newNote = new NoteData(this, beat, pitch, duration);
        this.notes[newNote.key] = newNote;
        this.notesByPosition[newNote.GetRollPosition()] = newNote;
    }

    MoveNote = (noteUniqueKey,newPitch,newBeat) => {
        console.log(`Move note: ${noteUniqueKey}`)
        console.log(this.notes[noteUniqueKey]);
        this.notes[noteUniqueKey].pitch = newPitch;
        this.notes[noteUniqueKey].beat = newBeat;
    }

    RemoveNote = (noteUniqueKey) => {
        console.log(`remove note: ${noteUniqueKey}`)
        delete this.notes[noteUniqueKey];
    }

    Update = () => {
        this.song.Update();
    }
}

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

    MoveNote = (trackIndex,noteUniqueKey,newPitch,newBeat) => {
        this.tracks[trackIndex].MoveNote(noteUniqueKey,newPitch,newBeat);
        this.app.setState({ song: this });
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