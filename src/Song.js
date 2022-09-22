export default class Song {
    constructor(app) {
        this.app = app;

        this.name = "song";
        this.bpm = 100;
        this.timeSignature = 4; //beats per measure
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