# webaudio-toneplayer
An interface to play tones, sequences of tones, and chords for webaudio

```javascript
const context = createTonePlayerContext();

const keyboard = TonePlayer.create({
    defaultType: 'square',
    defaultVolume: 0.1,
    defaultDuration: 0.25,
    defaultDecay: 0.05,
    defaultAttack: 0.05,
    context: context
});

const ambiance = TonePlayer.create({
    defaultType: 'square',
    defaultVolume: 0.025,
    defaultDuration: 1,
    context: context
});

ambiance.playChord(['a','c','e']);
keyboard.playNotes(['a','a','e'],{
	distance: 0.25
});
```