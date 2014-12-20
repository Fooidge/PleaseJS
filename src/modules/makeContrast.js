function contrast_quotient( HSV ){
	var RGB = Please.HSV_to_RGB( HSV );
	var YIQ = ( ( RGB.r * 299 ) +
				( RGB.g * 587 ) +
				( RGB.b * 114 )
			) / 1000;
	return ( YIQ >= 128 ) ? 'dark' : 'light';
}

//accepts HSV object returns contrasting color
Please.make_contrast = function( HSV, options ){

	//clone base please options
	var contrast_options = copy_object( make_contrast_default );

	if( options !== null ){
	//override base Please options
		for( var key in options ){
			if( options.hasOwnProperty( key )){
				contrast_options[key] = options[key];
			}
		}
	}

	var contrast,
	value_range = contrast_quotient( HSV ),
	adjusted_hue;

	if( contrast_options.golden === true ){
		adjusted_hue = ( HSV.h * ( 1 + PHI ) ) % 360;
	}
	else{
		var contrast_base =
		Please.make_scheme( HSV,
		{
			scheme_type: 'complementary',
			format: 'hsv'
		})[1];
		adjusted_hue = clamp( ( contrast_base.h - 30 ), 0, 360 );
	}
	var adjusted_value;
	if ( value_range === 'dark' ){
		adjusted_value = clamp( ( HSV.v - 0.25 ), 0, 1 );
	}
	else if ( value_range === 'light' ){
		adjusted_value = clamp( ( HSV.v + 0.25 ), 0, 1 );
	}
	contrast = [{
		h: adjusted_hue,
		s: HSV.s,
		v: adjusted_value
	}];

	convert_to_format( contrast_options.format.toLowerCase(), contrast );
	return contrast[0];
};