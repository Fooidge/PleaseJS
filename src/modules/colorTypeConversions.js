Please.NAME_to_HEX = function( name ){
	name = name.toLowerCase();
	if( name in color_data ){
		return color_data[name];
	}
	else{
		console.error( 'Color name not recognized.' );
	}
};

Please.NAME_to_RGB = function( name ){
	return Please.HEX_to_RGB( Please.NAME_to_HEX( name ));
};

Please.NAME_to_HSV = function( name ){
	return Please.HEX_to_HSV( Please.NAME_to_HEX( name ));
};

//accepts hex string, produces RGB object
Please.HEX_to_RGB = function( hex ){
	var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace( regex, function( m, r, g, b ) {
		return r + r + g + g + b + b;
	});
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	return result ? {
		r: parseInt( result[1], 16 ),
		g: parseInt( result[2], 16 ),
		b: parseInt( result[3], 16 )
	} : null;
};

//accepts RGB object, produces hex string
Please.RGB_to_HEX = function( RGB ){
	return "#" +
	(( 1 << 24 ) + ( RGB.r << 16 ) + ( RGB.g << 8 ) + RGB.b )
	.toString( 16 ).slice( 1 );
};

//accepts HSV object, returns RGB object
Please.HSV_to_RGB = function( HSV ){
	var h = HSV.h,
		s = HSV.s,
		v = HSV.v;

	var r, g, b;

	var i, f, p, q, t;

	if( s === 0 ){
		return {
			r: v,
			g: v,
			b: v
		};
	}
	h /= 60;
	i = Math.floor( h );
	f = h - i;
	p = v * ( 1 - s );
	q = v * ( 1 - s * f );
	t = v * ( 1 - s * ( 1 - f ) );

	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		case 5:
			r = v;
			g = p;
			b = q;
			break;
	}

	return {
		r: Math.floor(r * 255),
		g: Math.floor(g * 255),
		b: Math.floor(b * 255)
	};
};

//accepts RGB object, returns HSV object
Please.RGB_to_HSV = function( RGB ){
	var r = ( RGB.r / 255 ),
		g = ( RGB.g / 255 ),
		b = ( RGB.b / 255 );
	var computed_H = 0,
		computed_S = 0,
		computed_V = 0;
	var min_RGB = Math.min( r, Math.min( g, b ) ),
		max_RGB = Math.max( r, Math.max( g, b ) );
	// Black-gray-white
	if ( min_RGB === max_RGB ) {
		computed_V = min_RGB;
		return{
			h: 0,
			s: 0,
			v: computed_V
		};
	}
	// Colors other than black-gray-white:
	var d = ( r === min_RGB ) ? g - b : (( b === min_RGB ) ? r - g : b - r);
	var h = ( r === min_RGB ) ? 3 : (( b === min_RGB ) ? 1 : 5 );
	computed_H = 60 * ( h - d / ( max_RGB - min_RGB ));
	computed_S = ( max_RGB - min_RGB ) / max_RGB;
	computed_V = max_RGB;
	return {
		h: computed_H,
		s: computed_S,
		v: computed_V
	};
};

//accepts HSV object, returns hex string
Please.HSV_to_HEX = function( HSV ){
	return Please.RGB_to_HEX( Please.HSV_to_RGB( HSV ));
};

//accepts hex string, returns HSV object
Please.HEX_to_HSV = function( hex ){
	return Please.RGB_to_HSV( Please.HEX_to_RGB( hex ));
};