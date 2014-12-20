//accepts HSV object and options object, returns list or single object depending on options
Please.make_scheme = function( HSV, options ){
	//clone base please options
	var scheme_options = copy_object( make_scheme_default ),
	adjusted,
	secondary,
	adjusted_h,
	adjusted_s,
	adjusted_v,
	i;

	if( options !== null ){
	//override base Please options
		for( var key in options ){
			if( options.hasOwnProperty( key )){
				scheme_options[key] = options[key];
			}
		}
	}

	var scheme = [HSV];
	//DRY for repeated cloning
	function clone( HSV ){
		return{
			h: HSV.h,
			s: HSV.s,
			v: HSV.v
		};
	}
	switch( scheme_options.scheme_type.toLowerCase() ){
		case 'monochromatic':
		case 'mono':
			for ( i = 1; i <= 2; i++ ) {

				adjusted = clone( HSV );

				adjusted_s = adjusted.s + ( 0.1 * i );
				adjusted_s = clamp( adjusted_s, 0, 1 );

				adjusted_v = adjusted.v + ( 0.1 * i );
				adjusted_v = clamp( adjusted_v, 0, 1 );

				adjusted.s = adjusted_s;
				adjusted.v = adjusted_v;

				scheme.push( adjusted );
			}
			for ( i = 1; i <= 2; i++ ) {

				adjusted = clone( HSV );

				adjusted_s = adjusted.s - ( 0.1 * i );
				adjusted_s = clamp( adjusted_s, 0, 1 );

				adjusted_v = adjusted.v - ( 0.1 * i );
				adjusted_v = clamp( adjusted_v, 0, 1 );

				adjusted.s = adjusted_s;
				adjusted.v = adjusted_v;

				scheme.push( adjusted );
			}
		break;
		case 'complementary':
		case 'complement':
		case 'comp':
			adjusted = clone( HSV );
			adjusted.h = ( adjusted.h + 180 ) % 360;
			scheme.push( adjusted );
		break;
		//30 degree seperation
		case 'split-complementary':
		case 'split-complement':
		case 'split':
			adjusted = clone( HSV );
			adjusted.h = ( adjusted.h + 165 ) % 360;
			scheme.push( adjusted );
			adjusted = clone( HSV );
			adjusted.h = Math.abs( ( adjusted.h - 165 ) % 360 );
			scheme.push( adjusted );
		break;
		case 'double-complementary':
		case 'double-complement':
		case 'double':
			//first basic complement
			adjusted = clone( HSV );
			adjusted.h = ( adjusted.h + 180 ) % 360;
			scheme.push( adjusted );
			//then offset
			adjusted.h = ( adjusted.h + 30 ) % 360;
			secondary = clone( adjusted );
			scheme.push( adjusted );
			//complement offset
			adjusted.h = ( adjusted.h + 180 ) % 360;
			scheme.push( secondary );
		break;
		case 'analogous':
		case 'ana':
			for ( i = 1; i <= 5; i++ ) {
				adjusted = clone( HSV );
				adjusted.h = ( adjusted.h + ( 20 * i ) ) % 360;
				scheme.push( adjusted );
			}
		break;
		case 'triadic':
		case 'triad':
		case 'tri':
			for ( i = 1; i < 3; i++ ) {
				adjusted = clone( HSV );
				adjusted.h = ( adjusted.h + ( 120 * i ) ) % 360;
				scheme.push( adjusted );
			}
		break;
		default:
			console.error( 'Color scheme not recognized.' );
		break;
	}
	convert_to_format( scheme_options.format.toLowerCase(), scheme );
	return scheme;
};
