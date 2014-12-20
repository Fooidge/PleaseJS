var PHI = 0.618033988749895;

function random_int( min, max, randomiser ){
	var random = Math.random;
	if ( randomiser instanceof RC4Random ) {
		random = randomiser.random;
	}
	return Math.floor( random() * ( max - min + 1 )) + min;
}

function random_float( min, max, randomiser ){
	var random = Math.random;
	if (randomiser instanceof RC4Random) {
		random = randomiser.random;
	}
	return random() * ( max - min ) + min;
}

function clamp( num, min, max ){
	return Math.max( min, Math.min( num, max ));
}
