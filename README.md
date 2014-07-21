#PleaseJS

www.checkman.io/please

Please.js is a polite companion that wants to help you make your projects beautiful. It uses HSV color space to create random pleasing colors as well as color schemes based on a given color.
It has two core functions and a bunch of little helpers for you to use.


```js
Please.make_color();
//or
Please.make_scheme(
{
	h: 145,
	s: .7,
	v: .6
},
{
	scheme_type: 'triadic',
	format: 'rgb-string'
});
```

##Core

### make_color

```js
Please.make_color({options})
```

The make_color function by default will generate and return a random hex string using the golden ratio to ensure that the color will look nice on your screen.

You can also pass an options object to make_color and have it do a whole bunch of different things.

#### make_color options:

 * **hue**: `(0-360)` By setting the hue, you determine the color.
 * **saturation**: `(0.0-1.0)` By setting the saturation, you determine the distance from gray.
 * **value**: `(0.0-1.0)` By setting the value, you determine the balance between black and white.
 * **base_color**: `('the name of an HTML color')` Setting a base_color (e.g. 'pink') will create a random color within the HSV range of the chosen color. Please will recognize any of the 146 standard HTML colors, it has a very good memory.
 * **greyscale** | **grayscale**: `(true/false)` Setting either greyscale or grayscale (but we all know which one is correct) to true will cause all of the colors you generate to be within the grey or gray range. This is effectively the same as setting your saturation to 0.
 * **golden**: `(true/false)` Setting golden to true randomizes your hue (overrides hue setting) and makes you a spectacular color based on the golden ratio. It's so good, it's the default. Make sure to turn it off if you want to have more control over your generated colors.
 * **full_random**: `(true/false)` Setting full_random to true will make Please lose its mind. It will completely randomize the hue, saturation, and value of the colors it makes.
 * **colors_returned**: `(1-infinity)` Setting colors_returned to higher than 1 will return an array full of the colors Please has made for you. If you set it to 1, you'll just get the one color! It makes a sort of sense if you think about it.
 * **format**: `('format string')` Setting format string, will change the format of what make_color will return for you. The options are as follows (example is the color black):
	 * `'hex'` = '#000000'
	 * `'rgb'` = {r: 0, g: 0,b: 0}
	 * `'rgb-string'` = 'rgb(0,0,0)'
	 * `'hsv'` = {h: 0, s: 0, v: 0}

Here are the defaults for each option:
```js
{
	hue: null,
	saturation: null,
	value: null,
	base_color: '',
	greyscale: false,
	grayscale: false,
	golden: true,
	full_random: false,
	colors_returned: 1,
	format: 'hex',
}
```

Here is an example of a fully random color call:
```js
Please.make_color({
	golden: false,
	full_random: true
});
```

Here is an example that will produce 100 reds as RGB strings:
```js
Please.make_color({
	golden: false,
	base_color: 'red',
	colors_returned: 100,
	format: 'rgb-string'
});
```

--------------

### make_scheme

The second core function allows Please to make a color scheme for you.

```js
Please.make_scheme(base_color,{options})
```

The make scheme function will return a series of colors based upon the color and options you feed it. The base_color must be in HSV color space and is an object in the format of
```js
{
	h: ___,
	s: ___,
	v: ___
}
```

#### make_scheme options:

 * **scheme_type**
	 * `'monochromatic'` | `'mono'` - Makes a 5 color scheme using your provided color, all the colors will be fairly similar to each other.
	 * `'complementary'` | `'complement'` - Makes a two color scheme using your provided color, the 2nd color will be the complement of the 1st, such that mixing them will create a neutral grey.
	 * `'split-complementary'` | `'split-complement'` | `'split'` - Makes a three color scheme where the 2nd and 3rd colors are at a 30 degree split from the complement of the 1st color.
	 * `'double-complementary'` | `'double-complement'` | `'double'` - Makes a four color scheme where the 2nd color is the complement of the 1st, and the 3rd and 4th colors are complements of each other at a 30 degree ofset from the first pair
	 * `'analogous'` | `'ana'` - Makes a six color scheme where each additional color is offset from the 1st by 20 degrees.
	 * `'triadic'` | `'triad'` | `'tri'` - Makes a 3 color scheme where the 2nd and 3rd color are equally spaced from the 1st.
 * **format**: `('format string')` Setting format string, will change the format of what make scheme will return for you. The options are as follows (example is the color white):
	 * `'hex'` = '#ffffff'
	 * `'rgb'` = {r: 255, g: 255,b: 255}
	 * `'rgb-string'` = 'rgb(255,255,255)'
	 * `'hsv'` = {h: 0, s: 0, v: 1}

Here is an example of a complementary scheme in hex:
```js
Please.make_scheme(
{
	h: 130,
	s: .7.
	v: .75
},
{
	scheme_type: 'complement',
	format: 'hex'
});
```

Here is an example that will produce a triadic scheme in rgb-strings:
```js
Please.make_scheme(
{
	h: 130,
	s: .7.
	v: .75
},
{
	scheme_type: 'triadic',
	format: 'rgb-string'
});
```

Here are the defaults for each option:
```js
{
	scheme_type: 'analogous',
	format: 'hex'
}
```

--------------

## Other Methods

Please also has some bonus features. It allows you to convert freely between the color formats of RGB, HSV, and HEX.

RGB_to_HEX()
HEX_to_RGB()
RGB_to_HSV()
HSV_to_RGB()
HEX_to_HSV()
HSV_to_HEX()

conversion from HSV or RGB expect an object with the properties
```js
{
	r: 0-255,
	g: 0-255,
	b: 0-255
}
```
and
```js
{
	h: 0-360,
	s: 0.0-1.0,
	v: 0,0-1.0
}
```

respectively, while converstions from HEX expect a string. Return formats are modeled the same way as the arguments.

In addition Please, can convert from an HTML color name into HEX, RGB, or HSV.

```js
NAME_to_HEX()
NAME_to_RGB()
NAME_to_HSV()
```

These functions take a string and return a HEX string or an RGB/HSV object.

I hope you enjoy using Please. Have fun, and remember to say the magic word.

--------------

## License

MIT
