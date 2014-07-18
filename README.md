PleaseJS
========
___

JavaScript Library for creating random pleasing colors and color schemes.

> [www.checkman.io/please](www.checkman.io/please)

Please.js is a polite companion that wants to help you make your projects beautiful.  It uses HSV color space to create random pleasing colors as well as color schemes based on a given color.

Please offers you two methods, `make_color()` and `make_scheme()`.
___

Usage
----

```javascript
Please.make_color();

Please.make_scheme({
	h: 145,
	s: .7,
	v: .6
}, {
	scheme_type: 'triadic',
	format: 'rgb-string'
});
```

___


Please.make_color(opts)
----

The make_color function by default will generate and return a random hex string using the golden ratio to ensure that the color will look nice on your screen.


```javascript
// Default options for Please.make_color()
var opts = {
    // By setting the hue, you determine the color.
    // input: 0 - 360
    hue: null,
    
    // By setting the saturation, you determine the distance from gray.
    // input: 0.0 - 1.0
    saturation: null,
    
    // By setting the value, you determine the balance between black and white.
    // input: 0.0 - 1.0
    value: null,
    
    // Setting a base_color (e.g. "pink") will create a random color within its HSV.
    // Please will recognize any of the 146 standard HTML colors, it has a very good memory.
    base_color: '',
    
    // A boolean that sets the saturation to 0, useful if you want something black and white.
    greyscale: false,
    
    // Alias for greyscale
    grayscale: false,
    
    // Setting golden to true randomizes your hue (overrides hue setting)
    // and makes you a spectacular color based on the golden ratio.
    // It's so good, it's the default.
    // Make sure to turn it off if you want to have more control over your generated colors.
    golden:, true,
    
    // Setting full_random to true will make Please lose its mind.
    // It will completely randomize the hue, saturation, and value of the colors it makes.
    full_random: false,
    
    // hashes a string and it maps it to a color, very useful when creating colors for
    // certain entities and always emiting the same color for consistency
    // the input can be any sized string.
    from_hash: null,
    
    // Setting colors_returned to higher than 1 will return an array full of the colors.
    // If you set it to 1, you'll just get the one color!
    // It makes a sort of sense if you think about it.
    colors_returned: 1,
    
    // Setting format string, will change the format of what make_color will return for you.
    // 'hex' -> '#000000'
    // 'rgb' -> {r: 0, g: 0, b: 0}
    // 'rgb-string' -> 'rgb(0,0,0)'
    // 'hsv' -> {h: 0, s: 0, v: 0}
    format: 'hex'
};
```


Here is an example of a fully random color call:
```javascript
Please.make_color({
	golden: false,
	full_random:true
});
```

Here is an example that will produce 100 reds as RGB strings:
```javascript
Please.make_color({
	golden: false,
	base_color: 'red',
	colors_returned: 100,
	format: 'rgb-string'
});
```
___

Please.make_scheme(base_color, opts)
----

Please can also make full harmonious color schemes.

The make scheme function will return a series of colors based upon the color and options you feed it.  The base_color must be in HSV color space and is an object in the format of
```javascript
var base_color = {
	h: 0, // Hue
	s: 0, // Saturation
	v: 0 // Value
};
```

### default make_scheme options:

```javascript
var opts = {
    scheme_type: 'analogous',
	format: 'hex'
}
```

** scheme_type (string) **

* `['monochromatic' | 'mono']` Makes a 5 color scheme using your provided color, all the colors will be fairly similar to each other.

* `['complementary' | 'complement']` Makes a two color scheme using your provided color, the 2nd color will be the complement of the 1st, such that mixing them will create a neutral grey.

* `['split-complementary' | 'split-complement' | 'split']` Makes a three color scheme where the 2nd and 3rd colors are at a 30 degree split from the complement of the 1st color.

* `['double-complementary' | 'double-complement' | 'double']` Makes a four color scheme where the 2nd color is the complement of the 1st, and the 3rd and 4th colors are complements of each other at a 30 degree ofset from the first pair

* `['analogous' | 'ana']` Makes a six color scheme where each additional color is offset from the 1st by 20 degrees.

* `['triadic' | 'triad' | 'tri']` Makes a 3 color scheme where the 2nd and 3rd color are equally spaced from the 1st.

*** format (string) ***

> Setting format string, will change the format of what make scheme will return for you. The options are as follows (example is the color white):

* 'hex' = '#ffffff'  
* 'rgb' = {r: 255, g: 255,b: 255}  
* 'rgb-string' = 'rgb(255,255,255)'  
* 'hsv' = {h: 0, s: 0, v: 1}  



** Here is an example of a complementary scheme in hex: **
```javascript
Please.make_scheme({
	h: 130,
	s: 0.7,
	v: 0.75
}, {
	scheme_type: "complement",
	format: "hex"
});
```

** Here is an example that will produce a triadic scheme in rgb-strings: **
```javascript
Please.make_scheme({
	h: 130,
	s: 0.7,
	v: 0.75
}, {
	scheme_type: "triadic",
	format: "rgb-string"
});
```

Bonus
----

Please also has some bonus features, it allows you to convert freely between the color formats of RGB, HSV, and HEX.

```javascript
RGB_to_HEX(rgb_obj);
HEX_to_RGB(hex_str);
RGB_to_HSV(rgb_obj);
HSV_to_RGB(hsv_obj);
HEX_to_HSV(hex_str);
HSV_to_HEX(hvs_obj);
```

Conversion from RBG expects an object with the following properties:
```javascript
var rgb_obj = {
	r: 0-255,
	g: 0-255,
	b: 0-255
}
```
And conversion from HSV expects the following:
```javascript
var hsv_obj = {
	h: 0-360,
	s: 0.0-1.0,
	v: 0,0-1.0
}
```
Return formats are modeled the same way as the arguments.

In addition Please, can convert from an HTML color name into HEX, RGB, or HSV.
```javascript
NAME_to_HEX('blue');
NAME_to_RGB('black');
NAME_to_HSV('red');
```

These functions take a string and return a HEX string or an RGB/HSV object.

I hope you enjoy using Please.  Have fun, and remember to say the magic word.

License
----

MIT