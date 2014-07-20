/* @license
 * Please JS, Harmonious Color Generator v0.3.0
 * http://www.checkman.io/please/
 *
 * Published under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * (c) Jordan Checkman 2014
 */
(function(window){
	'use strict';
	function define_Please(){
		var Please = {};
		var COLOR_DATA = {
			aliceblue: 'F0F8FF',
			antiquewhite: 'FAEBD7',
			aqua: '00FFFF',
			aquamarine: '7FFFD4',
			azure: 'F0FFFF',
			beige: 'F5F5DC',
			bisque: 'FFE4C4',
			black: '000000',
			blanchedalmond: 'FFEBCD',
			blue: '0000FF',
			blueviolet: '8A2BE2',
			brown: 'A52A2A',
			burlywood: 'DEB887',
			cadetblue: '5F9EA0',
			chartreuse: '7FFF00',
			chocolate: 'D2691E',
			coral: 'FF7F50',
			cornflowerblue: '6495ED',
			cornsilk: 'FFF8DC',
			crimson: 'DC143C',
			cyan: '00FFFF',
			darkblue: '00008B',
			darkcyan: '008B8B',
			darkgoldenrod: 'B8860B',
			darkgray: 'A9A9A9',
			darkgrey: 'A9A9A9',
			darkgreen: '006400',
			darkkhaki: 'BDB76B',
			darkmagenta: '8B008B',
			darkolivegreen: '556B2F',
			darkorange: 'FF8C00',
			darkorchid: '9932CC',
			darkred: '8B0000',
			darksalmon: 'E9967A',
			darkseagreen: '8FBC8F',
			darkslateblue: '483D8B',
			darkslategray: '2F4F4F',
			darkslategrey: '2F4F4F',
			darkturquoise: '00CED1',
			darkviolet: '9400D3',
			deeppink: 'FF1493',
			deepskyblue: '00BFFF',
			dimgray: '696969',
			dimgrey: '696969',
			dodgerblue: '1E90FF',
			firebrick: 'B22222',
			floralwhite: 'FFFAF0',
			forestgreen: '228B22',
			fuchsia: 'FF00FF',
			gainsboro: 'DCDCDC',
			ghostwhite: 'F8F8FF',
			gold: 'FFD700',
			goldenrod: 'DAA520',
			gray: '808080',
			grey: '808080',
			green: '008000',
			greenyellow: 'ADFF2F',
			honeydew: 'F0FFF0',
			hotpink: 'FF69B4',
			indianred: 'CD5C5C',
			indigo: '4B0082',
			ivory: 'FFFFF0',
			khaki: 'F0E68C',
			lavender: 'E6E6FA',
			lavenderblush: 'FFF0F5',
			lawngreen: '7CFC00',
			lemonchiffon: 'FFFACD',
			lightblue: 'ADD8E6',
			lightcoral: 'F08080',
			lightcyan: 'E0FFFF',
			lightgoldenrodyellow: 'FAFAD2',
			lightgray: 'D3D3D3',
			lightgrey: 'D3D3D3',
			lightgreen: '90EE90',
			lightpink: 'FFB6C1',
			lightsalmon: 'FFA07A',
			lightseagreen: '20B2AA',
			lightskyblue: '87CEFA',
			lightslategray: '778899',
			lightslategrey: '778899',
			lightsteelblue: 'B0C4DE',
			lightyellow: 'FFFFE0',
			lime: '00FF00',
			limegreen: '32CD32',
			linen: 'FAF0E6',
			magenta: 'FF00FF',
			maroon: '800000',
			mediumaquamarine: '66CDAA',
			mediumblue: '0000CD',
			mediumorchid: 'BA55D3',
			mediumpurple: '9370D8',
			mediumseagreen: '3CB371',
			mediumslateblue: '7B68EE',
			mediumspringgreen: '00FA9A',
			mediumturquoise: '48D1CC',
			mediumvioletred: 'C71585',
			midnightblue: '191970',
			mintcream: 'F5FFFA',
			mistyrose: 'FFE4E1',
			moccasin: 'FFE4B5',
			navajowhite: 'FFDEAD',
			navy: '000080',
			oldlace: 'FDF5E6',
			olive: '808000',
			olivedrab: '6B8E23',
			orange: 'FFA500',
			orangered: 'FF4500',
			orchid: 'DA70D6',
			palegoldenrod: 'EEE8AA',
			palegreen: '98FB98',
			paleturquoise: 'AFEEEE',
			palevioletred: 'D87093',
			papayawhip: 'FFEFD5',
			peachpuff: 'FFDAB9',
			peru: 'CD853F',
			pink: 'FFC0CB',
			plum: 'DDA0DD',
			powderblue: 'B0E0E6',
			purple: '800080',
			rebeccapurple: '663399',
			red: 'FF0000',
			rosybrown: 'BC8F8F',
			royalblue: '4169E1',
			saddlebrown: '8B4513',
			salmon: 'FA8072',
			sandybrown: 'F4A460',
			seagreen: '2E8B57',
			seashell: 'FFF5EE',
			sienna: 'A0522D',
			silver: 'C0C0C0',
			skyblue: '87CEEB',
			slateblue: '6A5ACD',
			slategray: '708090',
			slategrey: '708090',
			snow: 'FFFAFA',
			springgreen: '00FF7F',
			steelblue: '4682B4',
			tan: 'D2B48C',
			teal: '008080',
			thistle: 'D8BFD8',
			tomato: 'FF6347',
			turquoise: '40E0D0',
			violet: 'EE82EE',
			wheat: 'F5DEB3',
			white: 'FFFFFF',
			whitesmoke: 'F5F5F5',
			yellow: 'FFFF00',
			yellowgreen: '9ACD32'
		};

		var PHI = 0.618033988749895;

		var MAKE_DEFAULTS = {
			COLOR: {
				hue: null,
				saturation: null,
				value: null,
				base_color: '',
				greyscale: false,
				grayscale: false, //whatever I support them both, murrica
				golden: true,
				from_hash: null,
				full_random: false,
				colors_returned: 1,
				format: 'hex'
			},
			SCHEME: {
				scheme_type: 'analogous',
				format: 'hex'
			},
			CONTRAST: {
				golden: false,
				format: 'hex'
			}
		};


		function randomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function random_float(min, max){
			return Math.random() * (max - min) + min;
		}

		function clamp(num, min, max){
			return Math.max(min, Math.min(num, max));
		}

		/**
		 * Hash function based on djb2.
		 * JavaScripts lacks a proper hash function.
		 * This one is fast and serves our needs.
		 * Aint no SHA-256 but it works.
		 * Modified it to XOR with a reverse answer.
		 *
		 * @author ElNinja
		 * @param {string} str String to be hashed
		 * @param {number} hashSize Number of chars desired
		 * @param {number} blockSize Block size between iterations
		 * @param {number} iterations
		 * @return {number} 32-bit integer hash
		 */
		function superhero_hash(str, hashSize, blockSize, iterations) {
			var djb2 = function(chars) {
			  if (typeof chars === 'string') {
			    chars = chars.split('').map(function(str){
			      return str.charCodeAt(0);
			    });
			  }
			  if (!Array.isArray(chars)) {
			    throw new Error('input must be a string or an array');
			  }
			  var djb2_hash = chars.reduce(function(prev, curr){
			    return ((prev << 5) + prev) + curr;
			  }, 5381);
			  // switch it up a bit..
			  return Math.abs(djb2_hash ^ djb2_hash.toString().split('').reverse().join(''));
			};

			var hash = '';
			for (var i = iterations - 1; i >= 0; i--) {
				hash = hash + djb2(str).toString().slice(-blockSize);
				str = hash;
			}
		  return hash.slice(-hashSize);
		}

		// maps a string to a desired value
		function createFromHash(action, str) {
			var x = 0;
			switch(action){
				case 'hue':
					// number between 0 and 360
					x = Math.round(3.6 * superhero_hash(str, 2, 2, 3));
					break;
				case 'saturation':
					// number between 0.0 and 1.0
					x = superhero_hash(str, 3, 3, 4) / 1000;
					break;
				case 'value':
					x = superhero_hash(str, 3, 1, 5) / 1000;
					break;
				default:
					console.error('Incorrect action selected as parameter at createFromHash function.');
					break;
			}
			// console.log(action + ': ' + x);
			return x;
		}

		function convert_to_format(format_string, array){
			var i = 0;
			switch (format_string) {
				case 'hex':
					for (i = 0; i < array.length; i++) {
						array[i] = Please.HSV_to_HEX(array[i]);
					}
					break;
				case 'rgb':
					for (i = 0; i < array.length; i++) {
						array[i] = Please.HSV_to_RGB(array[i]);
					}
					break;
				case 'rgb-string':
					for (i = 0; i < array.length; i++) {
						var raw_rgb =  Please.HSV_to_RGB(array[i]);
						array[i] =
							'rgb(' +
							raw_rgb.r + ',' +
							raw_rgb.g + ',' +
							raw_rgb.b + ')';
					}
					break;
				case 'hsv':
					break;
				default:
					console.log('Format not recognized.');
					break;
			}
			return array;
		}

		function contrast_quotient(HSV){
			var RGB = Please.HSV_to_RGB(HSV);
			var YIQ = ((RGB.r * 299) +
						(RGB.g * 587) +
						(RGB.b * 114)
					) / 1000;
			return (YIQ >= 128) ? 'dark' : 'light';
		}

		function copy_object(object){
			var copy = {};
			for(var key in object){
				if(object.hasOwnProperty(key)){
					copy[key] = object[key];
				}
			}
			return copy;
		}

		Please.NAME_to_HEX = function(name){
			if(name in COLOR_DATA){
				return COLOR_DATA[name];
			}
			else{
				console.log('Color name not recognized.');
			}
		};

		Please.NAME_to_HSV = function(name){
			return Please.HEX_to_RGB(Please.NAME_to_HEX(name));
		};

		Please.NAME_to_HSV = function(name){
			return Please.HEX_to_HSV(Please.NAME_to_HEX(name));
		};

		//accepts hex string, produces RGB object
		Please.HEX_to_RGB = function(hex){
			var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(regex, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		};

		//accepts RGB object, produces hex string
		Please.RGB_to_HEX = function(RGB){
			return '#' +
			((1 << 24) + (RGB.r << 16) + (RGB.g << 8) + RGB.b)
			.toString(16).slice(1);
		};

		//accepts HSV object, returns RGB object
		Please.HSV_to_RGB = function(HSV){
			var r, g, b;
			var h = (HSV.h / 360);
			var s = HSV.s;
			var v = HSV.v;
			var i = Math.floor(h * 6);
			var f = h * 6 - i;
			var p = v * (1 - s);
			var q = v * (1 - f * s);
			var t = v * (1 - (1 - f) * s);

			switch(i % 6){
				case 0:
					r = v; g = t; b = p;
					break;
				case 1:
					r = q; g = v; b = p;
					break;
				case 2:
					r = p; g = v; b = t;
					break;
				case 3:
					r = p; g = q; b = v;
					break;
				case 4:
					r = t; g = p; b = v;
					break;
				case 5:
					r = v; g = p; b = q;
					break;
			}
			return{
				r:Math.floor(r * 255),
				g:Math.floor(g * 255),
				b:Math.floor(b * 255)
			};
		};

		//accepts RGB object, returns HSV object
		Please.RGB_to_HSV = function(RGB) {
			var r, g, b;
			var computed_H = 0;
			var computed_S = 0;
			var computed_V = 0;
			r = (RGB.r / 255);
			g = (RGB.g / 255);
			b = (RGB.b / 255);
			var min_RGB = Math.min(r, Math.min(g, b));
			var max_RGB = Math.max(r, Math.max(g, b));
			// Black-gray-white
			if (min_RGB == max_RGB) {
				computed_V = min_RGB;
				return {
					h: 0,
					s: 0,
					v: computed_V
				};
			}
			// Colors other than black-gray-white:
			var d = (r == min_RGB) ? g - b : ((b == min_RGB) ? r - g : b - r);
			var h = (r == min_RGB) ? 3 : ((b == min_RGB) ? 1 : 5);
			computed_H = 60 * (h - d / (max_RGB - min_RGB));
			computed_S = (max_RGB - min_RGB) / max_RGB;
			computed_V = max_RGB;
			return {
				h: computed_H,
				s: computed_S,
				v: computed_V
			};
		};

		//accepts HSV object, returns hex string
		Please.HSV_to_HEX = function(HSV){
			return Please.RGB_to_HEX(Please.HSV_to_RGB(HSV));
		};

		//accepts hex string, returns HSV object
		Please.HEX_to_HSV = function(hex){
			return Please.RGB_to_HSV(Please.HEX_to_RGB(hex));
		};

		//accepts HSV object and options object, returns list or single object depending on options
		Please.make_scheme = function(HSV, options){
			// clone base please options
			var scheme_options = copy_object(MAKE_DEFAULTS.SCHEME);

			if(options !== null){
			//override base Please options
				for(var key in options){
					if(options.hasOwnProperty(key)){
						scheme_options[key] = options[key];
					}
				}
			}

			var scheme = [HSV];
			//DRY for repeated cloning
			function clone(HSV){
				return {
					h: HSV.h,
					s: HSV.s,
					v: HSV.v
				};
			}
			// initialize variables outside of loops.
			var adjusted, adjusted_s, adjusted_v = {};
			var i = 0;

			switch(scheme_options.scheme_type.toLowerCase()){
				case 'monochromatic':
				case 'mono':
					for (i = 1; i <= 2; i++) {
						adjusted = clone(HSV);

						adjusted_s = adjusted.s + (0.1 * i);
						adjusted_s = clamp(adjusted_s, 0, 1);

						adjusted_v = adjusted.v + (0.1 * i);
						adjusted_v = clamp(adjusted_v, 0, 1);

						adjusted.s = adjusted_s;
						adjusted.v = adjusted_v;

						scheme.push(adjusted);
					}
					for (i = 1; i <= 2; i++) {
						adjusted = clone(HSV);

						adjusted_s = adjusted.s - (0.1 * i);
						adjusted_s = clamp(adjusted_s, 0, 1);

						adjusted_v = adjusted.v - (0.1 * i);
						adjusted_v = clamp(adjusted_v, 0, 1);

						adjusted.s = adjusted_s;
						adjusted.v = adjusted_v;

						scheme.push(adjusted);
					}
					break;
				case 'complementary':
				case 'complement':
				case 'comp':
					adjusted = clone(HSV);
					adjusted.h = (adjusted.h + 180) % 360;
					scheme.push(adjusted);
					break;
				//30 degree seperation
				case 'split-complementary':
				case 'split-complement':
				case 'split':
					adjusted = clone(HSV);
					adjusted.h = (adjusted.h + 165) % 360;
					scheme.push(adjusted);
					adjusted = clone(HSV);
					adjusted.h = Math.abs((adjusted.h - 165) % 360);
					scheme.push(adjusted);
				break;
				case 'double-complementary':
				case 'double-complement':
				case 'double':
					//first basic complement
					adjusted = clone(HSV);
					adjusted.h = (adjusted.h + 180) % 360;
					scheme.push(adjusted);
					//then offset
					adjusted.h = (adjusted.h + 30) % 360;
					var secondary = clone(adjusted);
					scheme.push(adjusted);
					//complement offset
					adjusted.h = (adjusted.h + 180) % 360;
					scheme.push(secondary);
				break;
				case 'analogous':
				case 'ana':
					for (i = 1; i <= 5; i++) {
						adjusted = clone(HSV);
						adjusted.h = (adjusted.h + (20 * i)) % 360;
						scheme.push(adjusted);
					}
				break;
				case 'triadic':
				case 'triad':
				case 'tri':
					for (i = 1; i < 3; i++) {
						adjusted = clone(HSV);
						adjusted.h = (adjusted.h + (120 * i)) % 360;
						scheme.push(adjusted);
					}
				break;
				default:
					console.log('Color scheme not recognized.');
				break;
			}
			convert_to_format(scheme_options.format.toLowerCase(), scheme);
			return scheme;
		};
		//accepts options object returns list or single color
		Please.make_color = function(options){
			var color = [];
			//clone base please options
			var color_options = copy_object(MAKE_DEFAULTS.COLOR);

			if(options !== null){
			//override base Please options
				for(var key in options){
					if(options.hasOwnProperty(key)){
						color_options[key] = options[key];
					}
				}
			}
			//first, check for a base color
			var base_color = null;
			if (color_options.base_color.length > 0) {
				base_color = COLOR_DATA[color_options.base_color.toLowerCase()];
				base_color = Please.HEX_to_HSV(base_color);
			}
			for (var i = 0; i < color_options.colors_returned; i++) {
				var random_hue = (color_options.from_hash === null) ?
					randomInt(0, 360) : createFromHash('hue', color_options.from_hash);
				var hue,saturation,value;
				if (base_color !== null){
					hue = randomInt((base_color.h - 5), (base_color.h + 5));
					saturation = random_float(0.4, 0.85);
					value = random_float(0.4, 0.85);
					color.push({h: hue, s: saturation, v: value});
				}
				else{
					if(color_options.greyscale || color_options.grayscale){
						hue = 0;
					}
					//make hue goldennnnnnnn
					else if(color_options.golden === true){
						hue = (random_hue + (random_hue / PHI)) % 360;
					}
					else if(color_options.hue === null || color_options.full_random){
						hue = random_hue;
					} else {
						hue = clamp(color_options.hue, 0, 360);
					}
					//set saturation
					if (color_options.greyscale || color_options.grayscale) {
						saturation = 0; //if they want greyscale no saturation allowed
					}
					else if (color_options.full_random === true){
						saturation = random_float(0, 1);
					} else if (color_options.from_hash !== null){
						saturation = createFromHash('saturation', color_options.from_hash);
					} else if (color_options.saturation === null){
						saturation = 0.4;
					} else {
						saturation = clamp(color_options.saturation, 0, 1);
					}
					//set value
					if(color_options.full_random){
						value = random_float(0, 1);
					} else if (color_options.from_hash !== null){
						value = createFromHash('value', color_options.from_hash);
					} else if(color_options.greyscale || color_options.grayscale){
						value = random_float(0.15, 0.75);
					}
					else if(color_options.value === null){
						value = 0.75;
					}
					else {
						value = clamp(color_options.value, 0 ,1);
					}
					color.push({h: hue, s: saturation, v: value});
				}
			}
			//output options based on format
			convert_to_format(color_options.format.toLowerCase(), color);
			if (color.length === 1){return color[0];}
			else{return color;}
		};
		//accepts HSV object returns contrasting color
		Please.make_contrast = function(HSV, options){

			//clone base please options
			var contrast_options = copy_object(MAKE_DEFAULTS.CONTRAST);

			if(options !== null){
			//override base Please options
				for(var key in options){
					if(options.hasOwnProperty(key)){
						contrast_options[key] = options[key];
					}
				}
			}

			var contrast;
			var value_range = contrast_quotient(HSV);
			var adjusted_hue;

			if(contrast_options.golden) {
				adjusted_hue = (HSV.h * (1 + PHI)) % 360;
			}
			else{
				var contrast_base =
				Please.make_scheme(HSV,
				{
					scheme_type: 'complementary',
					format: 'hsv'
				})[1];
				adjusted_hue = clamp((contrast_base.h - 30), 0, 360);
			}
			var adjusted_value;
			if (value_range === 'dark'){
				adjusted_value = clamp((HSV.v - 0.25), 0, 1);
			}
			else if (value_range === 'light'){
				adjusted_value = clamp((HSV.v + 0.25), 0, 1);
			}
			contrast = [{
				h: adjusted_hue,
				s: HSV.s,
				v: adjusted_value
			}];

			convert_to_format(contrast_options.format.toLowerCase(), contrast);
			return contrast[0];
		};

		return Please;
	}
	//globalize it 3/60
	if(typeof(Please) == 'undefined') {
		window.Please = define_Please();
	}
})(window);
