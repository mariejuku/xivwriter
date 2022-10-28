import MidiPlayer from 'midi-player-js';

export default class Editor {
    constructor(app) {
        this.app = app;
        this.volume = 50;
        this.audioContext = app.audioContext;

        this.beatsToPixels = 80;
        this.subdivisions = 4;
        this.gridValue = "1/4";
        this.flyoutCallback = null;
    }

    play = (note) => {
        
    }

    zoom = (amount) => {

    }

    OpenFlyout = (callback) => {
        console.log("open flyout")
        this.flyoutCallback = callback;
        this.app.setState({flyoutOpen:true, dismissable:true, flyoutCallback:this.flyoutCallback});
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
}