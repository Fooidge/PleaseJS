describe("Please.make_scheme()",
  function (){
    var hsvToRgb = function (hsv){
      var chroma = hsv.v * hsv.s;
      var huePrime = hsv.h/60;
      var x = chroma
        * (1 - Math.abs(huePrime % 2 - 1));
      var ret1;
      var m;

      if (hsv.s == 0)
      {
        /* Hue is undefined. */
        ret1 = [0, 0, 0];
      }
      else if (0 <= huePrime && huePrime < 1)
      {
        /* 0 <= huePrime < 1. */
        ret1 = [chroma, x, 0];
      }
      else if (1 <= huePrime && huePrime < 2)
      {
        ret1 = [x, chroma, 0];
      }
      else if (2 <= huePrime && huePrime < 3)
      {
        ret1 = [0, chroma, x];
      }
      else if (3 <= huePrime && huePrime < 4)
      {
        ret1 = [0, x, chroma];
      }
      else if (4 <= huePrime && huePrime < 5)
      {
        ret1 = [x, 0, chroma];
      }
      else
      {
        ret1 = [chroma, 0, x];
      }
      m = hsv.v - chroma;
      ret = [ret1[0] + m, ret1[1] + m, ret1[2] + m];

      return [Math.round(ret[0] * 256), Math.round(ret[1] * 256),
        Math.round(ret[2] * 256)];
    };

    beforeEach(function () {
      this.analogous_test = function (options){
        var base_color = {
          h: Math.floor(Math.random() * 360),
          s: Math.random(),
          v: Math.random()
        };
        var scheme = Please.make_scheme(base_color, options);
        var correctColor;
        var returnedColor;
        var converter;

        switch (options ? options.format : undefined) {
          case 'hex':
          case undefined:
            converter = this.hexToRgb;
            break;
          case 'rgb':
            converter = function (x) {return [x.r, x.g, x.b]};
            break;
          case 'rgb-string':
            converter = function (color) {
              var rgb = [];

              /* Remove initial "rgb(". */
              color = color.slice(4);
              while (true) {
                rgb.push(parseInt(color, 10));
                var index = color.indexOf(",");
                if (index == -1)
                {
                  break; /* Done! */
                }
                color = color.slice(index + 1);
              }
              return rgb;
            };
            break;
          case 'hsv':
            converter = hsvToRgb;
            break;
        }

        for (var i = 0; i <= 5; i++) {
          correctColor = hsvToRgb({
            h: (base_color.h + (20 * i)) % 360,
            s: base_color.s,
            v: base_color.v
            });
          returnedColor = converter(scheme[i]);
          for (var j = 0; j <= 2; j++) {
            expect(returnedColor[j])
              .toBeCloseTo(correctColor[j], -1);
          }
        }
      }
    });

    /* Fails occasionally? */
    describe("set to make a monochromatic color scheme",
      function (){
        /* Test function is put in `this` so it can access
        `this.hexToRgb`. */
        beforeEach(function (){
          this.test = function (str){
            var base_color = {
              h: Math.floor(Math.random() * 360),
              s: Math.random(),
              v: Math.random()
              };
            var scheme = Please.make_scheme(base_color, {
              scheme_type: str
              });
            var correctBase = hsvToRgb(base_color);
            var returnedBase = this.hexToRgb(scheme[0]);
            var values = [1, 2, -1, -2];

            for (var i = 0; i <= 2; i++) {
              expect(returnedBase[i])
                .toBeCloseTo(correctBase[i], -1);
            }

            for (var i = 0; i <= 3; i++) {
              var correctColor = {};
              correctColor.h = base_color.h;
              correctColor.s = base_color.s + (0.1 * values[i]);
              correctColor.s = Math.max(0,
                Math.min(1, correctColor.s));
              correctColor.v = base_color.v + (0.1 * values[i]);
              correctColor.v = Math.max(0,
                Math.min(1, correctColor.v));
              correctColor = hsvToRgb(correctColor);
              for (var j = 0; j <= 2; j++) {
                expect(this.hexToRgb(scheme[i + 1])[j])
                  .toBeCloseTo(correctColor[j], -1);
              }
            }
          }
        });

        it("by passing {scheme_type: 'mono'} as an option",
          function (){
            this.test("mono");
          }
         );

        it("by passing {scheme_type: 'monochromatic'} as an option",
          function (){
            this.test("monochromatic");
          }
         );
      });

    describe("set to make a complementary color scheme",
      function (){
        beforeEach(function (){
          this.test = function (str){
            var base_color = {
              h: Math.floor(Math.random() * 360),
              s: Math.random(),
              v: Math.random()
              };
            var scheme = Please.make_scheme(base_color, {
              scheme_type: str
              });
            var correctBase = hsvToRgb(base_color);
            var returnedBase = this.hexToRgb(scheme[0]);
            var correctComplement = hsvToRgb({
              h: (base_color.h + 180) % 360,
              s: base_color.s,
              v: base_color.v
              });
            var returnedComplement = this.hexToRgb(scheme[1]);

            for (var i = 0; i <= 2; i++) {
              expect(returnedBase[i])
                .toBeCloseTo(correctBase[i], -1);
              expect(returnedComplement[i])
                .toBeCloseTo(correctComplement[i], -1);
            }
          }
        });

        it("by passing {scheme_type: 'complement'} as an option",
          function (){
            this.test("complement");
          }
         );

        it("by passing {scheme_type: 'complementary'} as an option",
          function (){
            this.test("complementary");
          }
         );
      });

    /* Help Wanted: Sometimes actual and expected are very different
    (expected is even negative sometimes!) */
    describe("set to make a split-complementary color scheme",
      function (){
        beforeEach(function (){
          this.test = function (str){
            var base_color = {
              h: Math.floor(Math.random() * 360),
              s: Math.random(),
              v: Math.random()
              };
            var scheme = Please.make_scheme(base_color, {
              scheme_type: str
              });
            var correctBase = hsvToRgb(base_color);
            var returnedBase = this.hexToRgb(scheme[0]);
            var correctSecond = hsvToRgb({
              h: (base_color.h + 165) % 360,
              s: base_color.s,
              v: base_color.v
              });
            var returnedSecond = this.hexToRgb(scheme[1]);
            var correctThird = hsvToRgb({
              h: (base_color.h - 165) % 360,
              s: base_color.s,
              v: base_color.v
              });
            var returnedThird = this.hexToRgb(scheme[2]);

            for (var i = 0; i <= 2; i++) {
              expect(returnedBase[i])
                .toBeCloseTo(correctBase[i], -1);
              expect(returnedSecond[i])
                .toBeCloseTo(correctSecond[i], -1);
              expect(returnedThird[i])
                .toBeCloseTo(correctThird[i], -1);
            }
          }
        });

        it("by passing {scheme_type: 'split'} as an option",
          function () {
            this.test("split");
          }
         );

        it(
          "by passing {scheme_type: 'split-complement'} as an "
          + "option",
          function () {
            this.test("split-complement");
          }
         );

        it(
          "by passing {scheme_type: 'split-complementary'} as an "
          + "option",
          function () {
            this.test("split-complementary");
          }
         );
      });

    /* TODO: Make this pass */
    describe("set to make a double-complementary color scheme",
      function () {
        beforeEach(
          function () {
            this.test = function (schemeStr) {
              var baseColor = {
                h: Math.random() * 360,
                s: Math.random(),
                v: Math.random()
              };
              var scheme = Please.make_scheme(
                baseColor,
                {
                  scheme_type: schemeStr,
                }
              );
              var expected = [], color;
              expected.push(baseColor);
              color = {
                h: (baseColor.h + 180) % 360,
                s: baseColor.s,
                v: baseColor.v
              };
              expected.push(color);
              color = {
                h: (color.h + 30) % 360,
                s: color.s,
                v: color.v
              };
              expected.push(color);
              color = {
                h: (color.h + 180) % 360,
                s: color.s,
                v: color.v
              };
              expected.push(color);
              for (var i = 0, actualColor, expectedColor; i < expected.length; i++) {
                actualColor = this.hexToRgb(scheme[i]);
                // console.log(expected);
                expectedColor = hsvToRgb(expected[i]);
                for (var j = 0; j < actualColor.length; j++) {
                  expect(actualColor[j]).toBeCloseTo(expectedColor[j], -1);
                }
              }
            };
          }
        );
        it('double', function() {
          this.test('double');
        });
        it('double-complement', function() {
          this.test('double-complement');
        });
        it('double-complementary', function() {
          this.test('double-complementary');
        });
      }
    );

    describe("set to make an analogous color scheme", function () {
      it("with default arguments", function () {
        this.analogous_test();
      });
      it("by passing {scheme_type: 'analogous'} as an option", function () {
        this.analogous_test({scheme_type: 'analogous'});
      });
      it("by passing {scheme_type: 'ana'} as an option", function () {
        this.analogous_test({scheme_type: 'ana'});
      });
    });

    describe("set to make a triadic color scheme", function () {
      beforeEach(function () {
        this.test = function (schemeStr) {
          var base_color = {
            h: Math.floor(Math.random() * 360),
            s: Math.random(),
            v: Math.random()
          };
          var scheme = Please.make_scheme(base_color, {
            scheme_type: schemeStr
          });
          var correctColor;
          var returnedColor;

          for (var i = 0; i < 3; i++) {
            correctColor = hsvToRgb({
              h: (base_color.h + (120 * i)) % 360,
              s: base_color.s,
              v: base_color.v
            });
            returnedColor = this.hexToRgb(scheme[i]);
            for (var j = 0; j <= 2; j++) {
              expect(returnedColor[j])
                .toBeCloseTo(correctColor[j], -1);
            }
          }
        }
      });

      it("by passing {scheme_type: 'triadic'} as an option", function () {
        this.test('triadic');
      });
      it('by passing {scheme_type: "triad"} as an option', function() {
        this.test('triad');
      });
      it('by passing {scheme_type: "tri"} as an option', function() {
        this.test('tri');
      });
    });

    it("set to return hex strings", function () {
      this.analogous_test({format: 'hex'});
    });
    it("set to return RGB objects", function () {
      this.analogous_test({format: 'rgb'});
    });
    it("set to return RGB strings", function () {
      this.analogous_test({format: 'rgb-string'});
    });
    it("set to return HSV objects", function () {
      this.analogous_test({format: 'hsv'});
    });
  });
