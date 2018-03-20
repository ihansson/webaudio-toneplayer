"use strict";

import { calculateFrequencyFromLetter } from './frequencyTools';

const TonePlayer = {
    defaultOptions: {
        defaultType: 'sine',
        defaultVolume: 0.5,
        defaultDuration: 0.5,
        defaultDelay: 0,
        defaultAttack: 0,
        defaultDecay: 0,
    },
    create: function(args) {
        const player = Object.create(this);
        player.init(args)
        return player
    },
    init: function(args) {
        this.options = Object.assign({}, this.defaultOptions, args || {});
        this.defaultType =  this.options.defaultType
        this.defaultVolume = this.options.defaultVolume
        this.defaultDuration = this.options.defaultDuration
        this.defaultAttack = this.options.defaultAttack
        this.defaultDecay = this.options.defaultDecay
        this.Context = this.options.context || createTonePlayerContext()
    },
    playNote: function(note, options) {

        if (!options) options = {}

        const Context = this.Context

        const gainNode = Context.createGain()
        gainNode.gain.setValueAtTime(0, Context.currentTime)
        gainNode.gain.setValueAtTime(options.volume || this.options.defaultVolume, Context.currentTime + (options.delay || this.options.defaultDelay));

        gainNode.connect(Context.destination)

        const oscillator = Context.createOscillator();
        oscillator.type = options.type || this.options.defaultType;
        oscillator.frequency.setValueAtTime(calculateFrequencyFromLetter(note), Context.currentTime + options.delay || this.options.defaultDelay);
        oscillator.connect(gainNode)
        oscillator.start();

        oscillator.stop(Context.currentTime + ((options.duration || this.options.defaultDuration) + (options.delay || this.options.defaultDelay)))

        oscillator.onended = () => {
            gainNode.disconnect(Context.destination)
            oscillator.disconnect(gainNode)
        }

    },
    playNotes: function(notes, options) {

        if (!options) options = {}
        if (!options.distance) options.distance = 0.5

        let primaryDelay = (options.delay || 0)
        let itterator = 0;

        notes.forEach(note => {
            let noteOptions = options
            noteOptions.delay = (options.distance * itterator) + primaryDelay
            this.playNote(note, noteOptions)
            itterator++;
        })

    },
    playChord: function(notes, options) {

        if (!options) options = {}

        notes.forEach(note => {
            this.playNote(note, options)
        })

    }
}

const createTonePlayerContext = () => {
    return new(window.AudioContext || window.webkitAudioContext)();
}

window.TonePlayer = TonePlayer
window.createTonePlayerContext = createTonePlayerContext