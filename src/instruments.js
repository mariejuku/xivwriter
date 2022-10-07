import iBassDrum from './icons/bassDrum.png';
import iBongo from './icons/bongo.png';
import iCello from './icons/cello.png';
import iClarinet from './icons/clarinet.png';
import iContrabass from './icons/contrabass.png';
import iCymbal from './icons/cymbal.png';
import iEGuitarClean from './icons/eGuitarClean.png';
import iEGuitarMuted from './icons/eGuitarMuted.png';
import iEGuitarOverdriven from './icons/eGuitarOverdriven.png';
import iEGuitarPowerChords from './icons/eGuitarPowerChords.png';
import iEGuitarSpecial from './icons/eGuitarSpecial.png';
import iFiddle from './icons/fiddle.png';
import iFife from './icons/fife.png';
import iFlute from './icons/flute.png';
import iHarp from './icons/harp.png';
import iHorn from './icons/horn.png';
import iLute from './icons/lute.png';
import iOboe from './icons/oboe.png';
import iPanpipes from './icons/panpipes.png';
import iPiano from './icons/piano.png';
import iSaxophone from './icons/saxophone.png';
import iSnareDrum from './icons/snareDrum.png';
import iTimpani from './icons/timpani.png';
import iTrombone from './icons/trombone.png';
import iTrumpet from './icons/trumpet.png';
import iTuba from './icons/tuba.png';
import iViola from './icons/viola.png';
import iViolin from './icons/violin.png';


const instruments = {
    Harp:{
        name:"Harp",
        character:"acoustic",
        range:0,
        image:iHarp,
    },
    Piano:{
        name:"Piano",
        character:"acoustic",
        range:1,
        image:iPiano
    },
    Lute:{
        name:"Lute",
        character:"acoustic",
        range:-1,
        image:iLute
    },
    Fiddle:{
        name:"Fiddle",
        character:"acoustic",
        range:-1,
        image:iFiddle
    },
    Flute:{
        name:"Flute",
        character:"wind",
        range:1,
        image:iFlute
    },
    Oboe:{
        name:"Oboe",
        character:"wind",
        range:1,
        image:iOboe
    },
    Clarinet:{
        name:"Clarinet",
        character:"wind",
        range:1,
        image:iClarinet
    },
    Fife:{
        name:"Fife",
        character:"wind",
        range:2,
        image:iFife
    },
    Panpipes:{
        name:"Panpipes",
        character:"wind",
        range:1,
        image:iPanpipes
    },
    Timpani:{
        name:"Timpani",
        character:"percussion",
        range:-1,
        image:iTimpani
    },
    Bongo:{
        name:"Bongo",
        character:"percussion",
        range:-1,
        image:iBongo
    },
    BassDrum:{
        name:"Bass Drum",
        character:"percussion",
        range:-2,
        image:iBassDrum
    },
    SnareDrum:{
        name:"Snare Drum",
        character:"percussion",
        range:0,
        image:iSnareDrum
    },
    Cymbal:{
        name:"Cymbal",
        character:"percussion",
        range:0,
        image:iCymbal
    },
    Trumpet:{
        name:"Trumpet",
        character:"brass",
        range:0,
        image:iTrumpet
    },
    Trombone:{
        name:"Trombone",
        character:"brass",
        range:-1,
        image:iTrombone
    },
    Tuba:{
        name:"Tuba",
        character:"brass",
        range:-2,
        image:iTuba
    },
    Horn:{
        name:"Horn",
        character:"brass",
        range:-1,
        image:iHorn
    },
    Saxophone:{
        name:"Saxophone",
        character:"wind",
        range:0,
        image:iSaxophone
    },
    Violin:{
        name:"Violin",
        character:"string",
        range:0,
        image:iViolin
    },
    Viola:{
        name:"Viola",
        character:"string",
        range:0,
        image:iViola
    },
    Cello:{
        name:"Cello",
        character:"string",
        range:-1,
        image:iCello
    },
    DoubleBass:{
        name:"Double Bass",
        character:"string",
        range:-2,
        image:iContrabass
    },
    ECOverdriven:{
        name:"Electric Guitar (Overdriven)",
        character:"electric",
        range:0,
        image:iEGuitarOverdriven
    },
    ECClean:{
        name:"Electric Guitar (Clean)",
        character:"electric",
        range:0,
        image:iEGuitarClean
    },
    ECMuted:{
        name:"Electric Guitar (Muted)",
        character:"electric",
        range:0,
        image:iEGuitarMuted
    },
    ECPowerChords:{
        name:"Electric Guitar (Power Chords)",
        character:"electric",
        range:0,
        image:iEGuitarPowerChords
    },
    ECSpecial:{
        name:"Electric Guitar (Special)",
        character:"electric",
        range:0,
        image:iEGuitarSpecial
    },
}

export default instruments;