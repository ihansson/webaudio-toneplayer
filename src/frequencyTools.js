const semiTone = 1.059463094359

function getLetterDistanceFromA(letter){
	const distances = {
		'a' : 0,
		'a#' : 1,
		'b' : 2,
		'c' : 3,
		'c#' : 4,
		'd' : 5,
		'd#' : 6,
		'e' : -5,
		'f' : -4,
		'f#' : -3,
		'g' : -2,
		'g#' : -1
	};
	return distances[letter]
}

function shiftFrequencyOctave(freq, octave){
	return freq * Math.pow(semiTone, octave * 12)
}

export function calculateFrequencyFromLetter(letter){
	const distance = getLetterDistanceFromA(letter.replace(/[0-9]/g, ''))
    let freq = 440 * Math.pow(semiTone, distance)

    const octave = letter.match(/\d+/)
    if(octave){
    	freq = shiftFrequencyOctave(freq, octave - 4)
    }
	return freq
}

export function getChordFrequencies(letter){

}