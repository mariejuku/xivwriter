export default class Player {
    constructor(app) {
        this.app = app;
        this.volume = 50;
        this.audioContext = app.audioContext;

        this.beatsToPixels = 80;
        this.subdivisions = 4;
        this.gridValue = "1/4";
    }

    play = (note) => {
        this.app.clavinet.play(note);
    }

    zoom = (amount) => {

    }

    changeGrid = (event) => {
        var oldGrid = this.subdivisions;
        var input = event.target.value.split('/')
        var newGrid = "";
        if (input[1] !== undefined) {
            newGrid = input[1];
            console.log(input[1]);
            if (!isNaN(parseInt(newGrid))) {
                let newSub = Math.min(Math.max(newGrid, 1), 64);
                this.subdivisions = newSub;
                newGrid = newSub;
            }
        }
        this.gridValue = "1/"+newGrid;
        this.app.setState({player: this})
    }

    changeVolume = (event) => {
        this.volume = event.target.value;
        this.app.setState({ player: this });
    }
}