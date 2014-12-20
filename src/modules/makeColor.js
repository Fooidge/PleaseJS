//accepts options object returns list or single color
Please.make_color = function( options ){
	var color = [],
	//clone base please options
		color_options = copy_object( make_color_default ),
		base_color = null;

	if( options !== null ){
	//override base Please options
		for( var key in options ){
			if( options.hasOwnProperty( key )){
				color_options[key] = options[key];
			}
		}
	}

	var randomiser = null;

	if (typeof color_options.seed === 'string') {
		randomiser = new RC4Random(color_options.seed);
	}

	//first, check for a base color
	if ( color_options.base_color.length > 0 ) {
		//then determine if its a hex string or a named color
		if( color_options.base_color.match( /^#?([0-9a-f]{3})([0-9a-f]{3})?$/i ) ){
			base_color = Please.HEX_to_HSV( color_options.base_color );
		}
		else{
			base_color = Please.NAME_to_HSV( color_options.base_color );
		}
	}
	for ( var i = 0; i < color_options.colors_returned; i++ ) {
		var random_hue = random_int( 0, 360, randomiser ),
			hue,
			saturation,
			value;
		if( base_color !== null ){
			hue = clamp( random_int( ( base_color.h - 5 ), ( base_color.h + 5 ), randomiser), 0, 360);
			//fix for black/gray as a base color returning reds
			if( base_color.s === 0 ) {
				saturation = 0;
			}
			else{
				saturation = random_float( 0.4, 0.85, randomiser );
			}
			value = random_float( 0.4, 0.85, randomiser );
			color.push({
				h: hue,
				s: saturation,
				v: value
			});
		}
		else{
			if( color_options.greyscale === true || color_options.grayscale === true ){
				hue = 0;
			}
			//make hue goldennnnnnnn
			else if( color_options.golden === true ){
				hue = ( random_hue + ( random_hue / PHI )) % 360;
			}
			else if( color_options.hue === null || color_options.full_random === true ){
				hue = random_hue;
			}
			else{
				hue = clamp( color_options.hue, 0, 360 );
			}
			//set saturation
			if ( color_options.greyscale === true || color_options.grayscale === true ) {
				saturation = 0; //if they want greyscale no saturation allowed
			}
			else if ( color_options.full_random === true ){
				saturation = random_float( 0, 1, randomiser );
			}
			else if ( color_options.saturation === null ){
				saturation = 0.4;
			}
			else{
				saturation = clamp( color_options.saturation, 0, 1 );
			}
			//set value
			if( color_options.full_random === true ){
				value = random_float( 0, 1, randomiser );
			}
			else if( color_options.greyscale === true || color_options.grayscale === true ){
				value = random_float( 0.15, 0.75, randomiser );
			}
			else if( color_options.value === null ){
				value = 0.75;
			}
			else{
				value = clamp( color_options.value, 0 , 1 );
			}
			color.push( {h: hue, s: saturation, v: value} );
		}
	}
	//output options based on format
	convert_to_format( color_options.format.toLowerCase(), color );

	return color;
};
