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

    changeName = (event) => {
        console.log(event.target.value);
        this.name = event.target.value;
        this.app.setState({ song: this });
    }
}