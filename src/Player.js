export default class Player {
    constructor(app) {
        this.app = app;
        this.volume = 50;
        this.audioContext = app.audioContext;

        this.measuresToPixels = 160;
        this.subdivisions = 3;
        this.gridValue = 3;
    }

    play = (note) => {
        this.app.clavinet.play(note);
    }

    changeGrid = (event) => {
        var oldGrid = this.subdivisions;
        var input = event.target.value.split('/')
        var newGrid = "";
        if (input[1] !== undefined) {
            newGrid = input[1];
            console.log(input[1]);
            //success
            this.subdivisons = newGrid;
        }
        this.gridValue = newGrid;
        this.app.setState({player: this})
    }

    changeVolume = (event) => {
        console.log(event.target.value);
        this.volume = event.target.value;
        this.app.setState({ player: this });
    }
}