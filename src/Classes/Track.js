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

    EditNote = (noteUniqueKey,newPitch,newBeat,newDuration) => {
        console.log(`Move note: ${noteUniqueKey}`)
        console.log(this.notes[noteUniqueKey]);
        this.notes[noteUniqueKey].pitch = newPitch;
        this.notes[noteUniqueKey].beat = newBeat;
        this.notes[noteUniqueKey].duration = newDuration;
    }

    RemoveNote = (noteUniqueKey) => {
        console.log(`remove note: ${noteUniqueKey}`)
        delete this.notes[noteUniqueKey];
    }

    PlayNote = (noteUniqueKey) => {
        this.app.clavinet.play(this.notes[noteUniqueKey].pitch);
    }

    Update = () => {
        this.song.Update();
    }
}