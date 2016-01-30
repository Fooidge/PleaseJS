describe("Please.make_color()",
  function (){

    /* Arbitrary maximum in colors_returned tests. */
    var MAX_COLORS_RETURNED = 256;

    var calcHue = function (color){
      var rgb = {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5), 16)
      };

      var calculatedHue = Math.atan2(Math.sqrt(3) * (rgb.g - rgb.b),
        2 * rgb.r - rgb.g - rgb.b);

      /* Make negative angles positive. */
      if (calculatedHue < 0)
      {
        calculatedHue += 2 * Math.PI;
      }

      return calculatedHue * 180 / Math.PI;
    };

    var calcSat = function (color){
      var rgb = {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5), 16)
      };

      var chroma = Math.max(rgb.r, rgb.g, rgb.b)
        - Math.min(rgb.r, rgb.g, rgb.b);
      var value = Math.max(rgb.r, rgb.g, rgb.b);
      var calculatedSat = 0;
      if (value != 0)
      {
        calculatedSat = chroma / value;
      }

      return calculatedSat;
    };

    var calcValue = function (color){
      var rgb = {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5), 16)
      };

      return Math.max(rgb.r, rgb.g, rgb.b)/255;
    };

    it("with default arguments",
      function (){
        var color = Please.make_color()[0];
        var hexRegex = /^#[0-9a-fA-F]{6}$/;
        expect(hexRegex.test(color)).toBe(true);

        /* I don't know how to test the hue. */
        expect(calcSat(color)).toBeCloseTo(0.4, 0);
        expect(calcValue(color)).toBeCloseTo(0.75, 0);
      }
     );

    it("with predetermined hue",
      function (){
        var hue = Math.floor(Math.random() * 360); /* Random hue. */

        var color = Please.make_color(
          {
            golden: false,
            hue: hue
          })[0];

        expect(calcHue(color)).toBeCloseTo(hue, -1);
      }
     );

    it("with predetermined saturation",
      function (){
        var saturation = Math.random();
        var color = Please.make_color(
          {
            saturation: saturation
          })[0];

        expect(calcSat(color)).toBeCloseTo(saturation, 1);
      }
     );

    it("with predetermined value",
      function (){
        var value = Math.random();
        var color = Please.make_color(
          {
            value: value
          })[0];


        expect(calcValue(color)).toBeCloseTo(value, 0);
      }
     );

    /* This occasionally fails for now. HELP WANTED. */
    it("with a base color",
      function (){
        var colors = [
          ["aliceblue", "F0F8FF"],
    			["antiquewhite", "FAEBD7"],
    			["aqua", "00FFFF"],
    			["aquamarine", "7FFFD4"],
    			["azure", "F0FFFF"],
    			["beige", "F5F5DC"],
    			["bisque", "FFE4C4"],
    			["black", "000000"],
    			["blanchedalmond", "FFEBCD"],
    			["blue", "0000FF"],
    			["blueviolet", "8A2BE2"],
    			["brown", "A52A2A"],
    			["burlywood", "DEB887"],
    			["cadetblue", "5F9EA0"],
    			["chartreuse", "7FFF00"],
    			["chocolate", "D2691E"],
    			["coral", "FF7F50"],
    			["cornflowerblue", "6495ED"],
    			["cornsilk", "FFF8DC"],
    			["crimson", "DC143C"],
    			["cyan", "00FFFF"],
    			["darkblue", "00008B"],
    			["darkcyan", "008B8B"],
    			["darkgoldenrod", "B8860B"],
    			["darkgray", "A9A9A9"],
    			["darkgrey", "A9A9A9"],
    			["darkgreen", "006400"],
    			["darkkhaki", "BDB76B"],
    			["darkmagenta", "8B008B"],
    			["darkolivegreen", "556B2F"],
    			["darkorange", "FF8C00"],
    			["darkorchid", "9932CC"],
    			["darkred", "8B0000"],
    			["darksalmon", "E9967A"],
    			["darkseagreen", "8FBC8F"],
    			["darkslateblue", "483D8B"],
    			["darkslategray", "2F4F4F"],
    			["darkslategrey", "2F4F4F"],
    			["darkturquoise", "00CED1"],
    			["darkviolet", "9400D3"],
    			["deeppink", "FF1493"],
    			["deepskyblue", "00BFFF"],
    			["dimgray", "696969"],
    			["dimgrey", "696969"],
    			["dodgerblue", "1E90FF"],
    			["firebrick", "B22222"],
    			["floralwhite", "FFFAF0"],
    			["forestgreen", "228B22"],
    			["fuchsia", "FF00FF"],
    			["gainsboro", "DCDCDC"],
    			["ghostwhite", "F8F8FF"],
    			["gold", "FFD700"],
    			["goldenrod", "DAA520"],
    			["gray", "808080"],
    			["grey", "808080"],
    			["green", "008000"],
    			["greenyellow", "ADFF2F"],
    			["honeydew", "F0FFF0"],
    			["hotpink", "FF69B4"],
    			["indianred", "CD5C5C"],
    			["indigo", "4B0082"],
    			["ivory", "FFFFF0"],
    			["khaki", "F0E68C"],
    			["lavender", "E6E6FA"],
    			["lavenderblush", "FFF0F5"],
    			["lawngreen", "7CFC00"],
    			["lemonchiffon", "FFFACD"],
    			["lightblue", "ADD8E6"],
    			["lightcoral", "F08080"],
    			["lightcyan", "E0FFFF"],
    			["lightgoldenrodyellow", "FAFAD2"],
    			["lightgray", "D3D3D3"],
    			["lightgrey", "D3D3D3"],
    			["lightgreen", "90EE90"],
    			["lightpink", "FFB6C1"],
    			["lightsalmon", "FFA07A"],
    			["lightseagreen", "20B2AA"],
    			["lightskyblue", "87CEFA"],
    			["lightslategray", "778899"],
    			["lightslategrey", "778899"],
    			["lightsteelblue", "B0C4DE"],
    			["lightyellow", "FFFFE0"],
    			["lime", "00FF00"],
    			["limegreen", "32CD32"],
    			["linen", "FAF0E6"],
    			["magenta", "FF00FF"],
    			["maroon", "800000"],
    			["mediumaquamarine", "66CDAA"],
    			["mediumblue", "0000CD"],
    			["mediumorchid", "BA55D3"],
    			["mediumpurple", "9370D8"],
    			["mediumseagreen", "3CB371"],
    			["mediumslateblue", "7B68EE"],
    			["mediumspringgreen", "00FA9A"],
    			["mediumturquoise", "48D1CC"],
    			["mediumvioletred", "C71585"],
    			["midnightblue", "191970"],
    			["mintcream", "F5FFFA"],
    			["mistyrose", "FFE4E1"],
    			["moccasin", "FFE4B5"],
    			["navajowhite", "FFDEAD"],
    			["navy", "000080"],
    			["oldlace", "FDF5E6"],
    			["olive", "808000"],
    			["olivedrab", "6B8E23"],
    			["orange", "FFA500"],
    			["orangered", "FF4500"],
    			["orchid", "DA70D6"],
    			["palegoldenrod", "EEE8AA"],
    			["palegreen", "98FB98"],
    			["paleturquoise", "AFEEEE"],
    			["palevioletred", "D87093"],
    			["papayawhip", "FFEFD5"],
    			["peachpuff", "FFDAB9"],
    			["peru", "CD853F"],
    			["pink", "FFC0CB"],
    			["plum", "DDA0DD"],
    			["powderblue", "B0E0E6"],
    			["purple", "800080"],
    			["rebeccapurple", "663399"],
    			["red", "FF0000"],
    			["rosybrown", "BC8F8F"],
    			["royalblue", "4169E1"],
    			["saddlebrown", "8B4513"],
    			["salmon", "FA8072"],
    			["sandybrown", "F4A460"],
    			["seagreen", "2E8B57"],
    			["seashell", "FFF5EE"],
    			["sienna", "A0522D"],
    			["silver", "C0C0C0"],
    			["skyblue", "87CEEB"],
    			["slateblue", "6A5ACD"],
    			["slategray", "708090"],
    			["slategrey", "708090"],
    			["snow", "FFFAFA"],
    			["springgreen", "00FF7F"],
    			["steelblue", "4682B4"],
    			["tan", "D2B48C"],
    			["teal", "008080"],
    			["thistle", "D8BFD8"],
    			["tomato", "FF6347"],
    			["turquoise", "40E0D0"],
    			["violet", "EE82EE"],
    			["wheat", "F5DEB3"],
    			["white", "FFFFFF"],
    			["whitesmoke", "F5F5F5"],
    			["yellow", "FFFF00"],
    			["yellowgreen", "9ACD32"]
        ];
        var index = Math.floor(Math.random() * colors.length);
        var generatedColor = Please.make_color(
          {
            base_color: colors[index][0]
          })[0];
        var approxEqual = function (a, b, error){
          return Math.abs(a - b) <= error;
        };
        var correctHue = calcHue("#" + colors[index][1]);
        var cond = [];

        cond[0] = approxEqual(correctHue - 5, calcHue(generatedColor),
          10);
        cond[1] = approxEqual(correctHue + 5, calcHue(generatedColor),
          10);
        cond[2] = approxEqual(0.4, calcSat(generatedColor), 10);
        cond[3] = approxEqual(0.85, calcSat(generatedColor), 10);
        cond[4] = approxEqual(0.4, calcValue(generatedColor), 10);
        cond[5] = approxEqual(0.85, calcValue(generatedColor), 10);

        expect((correctHue - 5 <= calcHue(generatedColor)) || cond[0])
          .toBe(true);
        expect((correctHue + 5 >= calcHue(generatedColor)) || cond[1])
          .toBe(true);

        expect((.4 <= calcSat(generatedColor)) || cond[2]).toBe(true);
        expect((.85 >= calcSat(generatedColor)) || cond[3]).toBe(true);

        expect((.4 <= calcValue(generatedColor)) || cond[4])
          .toBe(true);
        expect((.85 >= calcValue(generatedColor)) || cond[5])
          .toBe(true);
      }
     );

    describe("with grayscale/greyscale set to true",
      function (){
        beforeEach(function (){
          this.test = function (spelling){
            var options = {};
            spelling == "grayscale"
            ? (options.grayscale = true) : (options.greyscale = true);
            var color = Please.make_color(options)[0];

            expect(calcSat(color)).toBeCloseTo(0);
          }
        });

        it("(grayscale)",
          function (){
            this.test("grayscale");
          }
         );

        it("(greyscale)",
          function (){
            this.test("greyscale");
          }
         );
      }
    );



    it("with grayscale set to false",
      function (){
        var color = Please.make_color(
          {
            grayscale: false
          })[0];

        var hexRegex = /^#[0-9a-fA-F]{6}$/;
        expect(hexRegex.test(color)).toBe(true);
      }
     );

    it("with greyscale set to false",
      function (){
        var color = Please.make_color(
          {
            greyscale: false
          })[0];

        var hexRegex = /^#[0-9a-fA-F]{6}$/;
        expect(hexRegex.test(color)).toBe(true);
      }
     );

    it("with golden set to false",
      function (){
        var color = Please.make_color(
          {
            golden: false
          })[0];
        var hexRegex = /^#[0-9a-fA-F]{6}$/;

        expect(hexRegex.test(color)).toBe(true);

        expect(calcSat(color)).toBeCloseTo(0.4, 0);
        expect(calcValue(color)).toBeCloseTo(0.75, 0);
      }
     );

    it("with golden set to true",
      function (){
        var color = Please.make_color(
          {
            golden: true
          })[0];
        var hexRegex = /^#[0-9a-fA-F]{6}$/;
        expect(hexRegex.test(color)).toBe(true);

        /* I don't know how to test the hue. */
        expect(calcSat(color)).toBeCloseTo(0.4, 0);
        expect(calcValue(color)).toBeCloseTo(0.75, 0);
      }
     );

    it("with full_random set to true",
      function (){
        var color = Please.make_color(
          {
            full_random: true
          })[0];
        var hexRegex = /^#[0-9a-fA-F]{6}$/;
        expect(hexRegex.test(color)).toBe(true);
      }
     );

    it("with full_random set to false",
      function (){
        var color = Please.make_color(
          {
            full_random: false
          })[0];
        var hexRegex = /^#[0-9a-fA-F]{6}$/;
        expect(hexRegex.test(color)).toBe(true);

        /* I don't know how to test the hue. */
        expect(calcSat(color)).toBeCloseTo(0.4, 0);
        expect(calcValue(color)).toBeCloseTo(0.75, 0);
      }
     );

    it("with colors_returned explicitly set",
      function (){
        var colors_returned
          = Math.ceil(Math.random() * MAX_COLORS_RETURNED);
        var colors = Please.make_color(
          {
            colors_returned: colors_returned
          });
        var hexRegex = /^#[0-9a-fA-F]{6}$/;

        colors = colors instanceof Array ? colors : [colors];

        for (var i = 0; i < colors.length; i++)
        {

          expect(hexRegex.test(colors[i])).toBe(true);

          /* I don't know how to test the hue. */
          expect(calcSat(colors[i])).toBeCloseTo(0.4, 0);
          expect(calcValue(colors[i])).toBeCloseTo(0.75, 0);
        }
      }
     );

    it("with hex string returned",
      function (){
        var color = Please.make_color(
          {
            format: "hex"
          })[0];
        var hexRegex = /^#[0-9a-fA-F]{6}$/;

        expect(hexRegex.test(color)).toBe(true);
      }
     );

    it("with rgb object returned",
      function (){
        var color = Please.make_color(
          {
            format: "rgb"
          })[0];

        expect(color.r < 256 && color.r > -1).toBe(true);
        expect(color.g < 256 && color.g > -1).toBe(true);
        expect(color.b < 256 && color.b > -1).toBe(true);
      }
     );

    it("with rgb string returned",
      function (){
        var color = Please.make_color(
          {
            format: "rgb-string"
          })[0];
        var rgbRegex = /^rgb\((?:[0-9]{1,3},){2}[0-9]{1,3}\)$/;

        expect(rgbRegex.test(color)).toBe(true);

        /** Parse color to validate it. **/

        /* Remove initial "rgb(". */
        color = color.slice(4);
        while (true)
        {
          expect(
            parseInt(color, 10) <= 255 && parseInt(color, 10) >= 0
            ).toBe(true);
          var index = color.indexOf(",");
          if (index == -1)
          {
            break; /* Done! */
          }
          color = color.slice(index + 1);
        }
      }
     );

    it("with hsv object returned",
      function (){
        var color = Please.make_color(
          {
            format: "hsv"
          })[0];

        /* Hue should be between 0 and 360 inclusive. */
        expect(color.h >= 0 && color.h <= 360).toBe(true);
        /* Saturation is from 0-1 inclusive. */
        expect(color.s >= 0 && color.s <= 1).toBe(true);
        /* Value is from 0-1 inclusive. */
        expect(color.v >= 0 && color.v <= 1).toBe(true);
      }
     );
  });
