describe("Please.make_scheme()",
  function (){
    beforeEach(function () {
      this.init_analogous_test = function (options){
        var base_color = {
          h: 0, s: 1, v: 1
        };
        this.scheme = Please.make_scheme(base_color, options);
        this.correctScheme = ['#ff0000', '#ff5400', '#ffaa00', '#ffff00', '#aaff00', '#54ff00'];
        this.correctSchemeHsv = [{ h: 0, s: 1, v: 1 }, { h: 20, s: 1, v: 1 }, { h: 40, s: 1, v: 1 }, { h: 60, s: 1, v: 1 }, { h: 80, s: 1, v: 1 }, { h: 100, s: 1, v: 1 }]
      }
    });

    describe("set to make a monochromatic color scheme",
      function (){
        /* Test function is put in `this` so it can access
        `this.hexToRgb`. */
        beforeEach(function (){
          this.test = function (str){
            var base_color = {h: 0, s: 1, v: 1};
            var scheme = Please.make_scheme(base_color, {
              scheme_type: str
              });

            expect(scheme).toEqual(['#ff0000', '#ff0000', '#ff0000', '#e51616', '#cc2828']);
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
            var base_color = {h: 0, s: 1, v: 1};
            var scheme = Please.make_scheme(base_color, {
              scheme_type: str
              });
            expect(scheme).toEqual(['#ff0000', '#00ffff']);
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

    describe("set to make a split-complementary color scheme",
      function (){
        beforeEach(function (){
          this.test = function (str){
            var base_color = {h: 0, s: 1, v: 1};
            var scheme = Please.make_scheme(base_color, {
              scheme_type: str
              });

            expect(scheme).toEqual(['#ff0000', '#00ffbf', '#00ffbf']);
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

    /* TODO: this fails because of a real bug */
    describe("set to make a double-complementary color scheme",
      function () {
        beforeEach(
          function () {
            this.test = function (schemeStr) {
              var baseColor = {h: 0, s: 1, v: 1};
              var scheme = Please.make_scheme(baseColor, {
                scheme_type: schemeStr,
              });
              expect(scheme).toEqual(['#ff0000', '#00ffff', '#007fff', '#ff7f00']);
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
        this.init_analogous_test();
        expect(this.scheme).toEqual(this.correctScheme);
      });

      it("by passing {scheme_type: 'analogous'} as an option", function () {
        this.init_analogous_test({scheme_type: 'analogous'});
        expect(this.scheme).toEqual(this.correctScheme);
      });

      it("by passing {scheme_type: 'ana'} as an option", function () {
        this.init_analogous_test({scheme_type: 'ana'});
        expect(this.scheme).toEqual(this.correctScheme);
      });
    });

    describe("set to make a triadic color scheme", function () {
      beforeEach(function () {
        this.test = function (schemeStr) {
          var base_color = {h: 0, s: 1, v: 1};
          var scheme = Please.make_scheme(base_color, {
            scheme_type: schemeStr
          });
          var correctScheme = ['#ff0000', '#00ff00', '#0000ff'];
          expect(scheme).toEqual(correctScheme);
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
      this.init_analogous_test({format: 'hex'});
      expect(this.scheme).toEqual(this.correctScheme);
    });

    it("set to return RGB objects", function () {
      this.init_analogous_test({format: 'rgb'});
      expect(this.scheme).toEqual(this.correctScheme.map(function (color) {
        color = this.hexToRgb(color);
        color = {r: color[0], g: color[1], b: color[2]};
        return color;
      }.bind(this)));
    });

    it("set to return RGB strings", function () {
      this.init_analogous_test({format: 'rgb-string'});
      expect(this.scheme).toEqual(this.correctScheme.map(function (color) {
        color = this.hexToRgb(color);
        color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        return color;
      }.bind(this)));
    });
    it("set to return HSV objects", function () {
      this.init_analogous_test({format: 'hsv'});
      expect(this.scheme).toEqual(this.correctSchemeHsv);
    });
  });
