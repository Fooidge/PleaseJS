function RC4Random( seed ) {
	var key_schedule = [];
	var key_schedule_i = 0;
	var key_schedule_j = 0;
	for ( var k = 0; k < 256; k++ ) key_schedule[k] = k;
	for ( var i = 0, j = 0; i < 256; i++ ) {
		j = ( j + key_schedule[i] + seed.charCodeAt( i % seed.length )) % 256;
		var t = key_schedule[i];
		key_schedule[i] = key_schedule[j];
		key_schedule[j] = t;
	}
	function get_random_byte() {
		key_schedule_i = ( key_schedule_i + 1 ) % 256;
		key_schedule_j = ( key_schedule_j + key_schedule[key_schedule_i] ) % 256;
		var t = key_schedule[key_schedule_i];
		key_schedule[key_schedule_i] = key_schedule[key_schedule_j];
		key_schedule[key_schedule_j] = t;
		return key_schedule[( key_schedule[key_schedule_i] + key_schedule[key_schedule_j] ) % 256];
	}
	this.random = function() {
		for ( var i = 0, number = 0, multiplier = 1; i < 8; i++ ) {
			number += get_random_byte() * multiplier;
			multiplier *= 256;
		}
		return number / 18446744073709551616;
	};
}
