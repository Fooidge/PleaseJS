// RGB_to_HEX test

describe('Please.RGB_to_HEX', function() {
  it('correctly converts RGB objects into hex strings', function() {
    var rgb = {
      r: Math.random()*256,
      g: Math.random()*256,
      b: Math.random()*256
    };
    var hex = Please.RGB_to_HEX(rgb);
    var correct_rgb = this.hexToRgb(hex);
    for (var i = 0; i < correct_rgb.length; i++) {
      expect(correct_rgb[i]).toBeCloseTo(rgb[['r', 'g', 'b'][i]], -1);
    }
  });
});
