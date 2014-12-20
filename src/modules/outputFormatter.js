function convert_to_format( format_string, array ){
	var i;
	switch( format_string ){
		case 'hex':
			for ( i = 0; i < array.length; i++ ) {
				array[i] = Please.HSV_to_HEX( array[i] );
			}
			break;
		case 'rgb':
			for ( i = 0; i < array.length; i++ ) {
				array[i] = Please.HSV_to_RGB( array[i] );
			}
			break;
		case 'rgb-string':
			for ( i = 0; i < array.length; i++ ) {
				var raw_rgb =  Please.HSV_to_RGB( array[i] );
				array[i] =
					"rgb(" +
					raw_rgb.r + "," +
					raw_rgb.g + "," +
					raw_rgb.b + ")";
			}
			break;
		case 'hsv':
			break;
		default:
			console.error( 'Format not recognized.' );
			break;
	}
	return array;
}
