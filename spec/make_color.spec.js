describe("Please.make_color()",
  function (){
    it("with default arguments",
      function (){
        var color = Please.make_color()[0];
        var hexRegex = /^#[0-9a-fA-F]{6}$/;
        expect(hexRegex.test(color)).toBe(true);

        /* I don't know how to test the hue. */
        expect(this.calcSat(color)).toBeCloseTo(0.4, 0);
        expect(this.calcValue(color)).toBeCloseTo(0.75, 0);
      }
     );

    it("with predetermined hue",
      function (){
        var hue = 0;

        var color = Please.make_color(
          {
            golden: false,
            hue: hue
          })[0];

        expect(this.calcHue(color)).toBeCloseTo(hue, -1);
      }
     );

    it("with predetermined saturation",
      function (){
        var saturation = 0.6;
        var color = Please.make_color(
          {
            saturation: saturation
          })[0];

        expect(this.calcSat(color)).toBeCloseTo(saturation, 1);
      }
     );

    it("with predetermined value",
      function (){
        var value = 0.5;
        var color = Please.make_color(
          {
            value: value
          })[0];


        expect(this.calcValue(color)).toBeCloseTo(value, 0);
      }
     );

    it("with a base color",
      function (){
        var generatedColor = Please.make_color(
          {
            base_color: 'red'
          })[0];

        // Correct hue
        var hue = this.calcHue(generatedColor);
        expect(0 <= hue && hue <= 5).toBe(true);

        // Correct saturation
        var sat = this.calcSat(generatedColor);
        expect(0.4 <= sat && sat <= 0.85).toBe(true);

        // Correct value
        var value = this.calcValue(generatedColor);
        expect(0.4 <= value && value <= 0.85).toBe(true);
      }
     );

    describe("with grayscale/greyscale set to true",
      function (){
        beforeEach(function (){
          this.test = function (spelling){
            var options = {};
            options[spelling] = true;
            var color = Please.make_color(options)[0];

            expect(this.calcSat(color)).toBeCloseTo(0);
          };
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

        expect(this.calcSat(color)).toBeCloseTo(0.4, 0);
        expect(this.calcValue(color)).toBeCloseTo(0.75, 0);
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
        expect(this.calcSat(color)).toBeCloseTo(0.4, 0);
        expect(this.calcValue(color)).toBeCloseTo(0.75, 0);
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
        expect(this.calcSat(color)).toBeCloseTo(0.4, 0);
        expect(this.calcValue(color)).toBeCloseTo(0.75, 0);
      }
     );

    it("with colors_returned explicitly set",
      function (){
        var colors_returned
          = 256;
        var colors = Please.make_color(
          {
            colors_returned: colors_returned
          });
        var hexRegex = /^#[0-9a-fA-F]{6}$/;

        expect(colors.length).toEqual(256);

        for (var i = 0; i < colors.length; i++)
        {

          expect(hexRegex.test(colors[i])).toBe(true);

          /* I don't know how to test the hue. */
          expect(this.calcSat(colors[i])).toBeCloseTo(0.4, 0);
          expect(this.calcValue(colors[i])).toBeCloseTo(0.75, 0);
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
