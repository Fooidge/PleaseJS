beforeEach(function (){
    this.hexToRgb = function (color){
        var rgb = [
            parseInt(color.slice(1, 3), 16),
            parseInt(color.slice(3, 5), 16),
            parseInt(color.slice(5), 16)
        ];

        return rgb;
    };

    this.hexToHsv = function (color) {
        var hsv = {h: this.calcHue(color), s: this.calcSat(color), v: this.calcValue(color)};
        return hsv;
    };

    this.calcHue = function (color){
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

    this.calcSat = function (color){
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

    this.calcValue = function (color){
      var rgb = {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5), 16)
      };

      return Math.max(rgb.r, rgb.g, rgb.b)/255;
    };
});
