describe('Please.RGB_to_HEX', function() {
  it('correctly converts RGB objects into hex strings', function() {
    var rgb = {r: 0, g: 0, b: 0};
    var hex = Please.RGB_to_HEX(rgb);
    expect(hex).toEqual('#000000');
  });
});

describe("Please.HEX_to_RGB", function () {
  it("correctly converts hex strings into RGB objects", function () {
    expect(Please.HEX_to_RGB('#000000')).toEqual({r: 0, g: 0, b: 0});
  });
});

describe("Please.RGB_to_HSV", function () {
  it("correctly converts RGB objects into HSV objects", function () {
    expect(Please.RGB_to_HSV({r: 255, g: 0, b: 0})).toEqual({h: 0, s: 1, v: 1});
  });
});

describe("Please.HSV_to_RGB", function () {
  it("correctly converts HSV objects into RGB objects", function () {
    expect(Please.HSV_to_RGB({h: 0, s: 1, v: 1})).toEqual({r: 255, g: 0, b: 0});
  });
});

describe("Please.HEX_to_HSV", function () {
  it("correctly converts hex strings into HSV objects", function () {
    expect(Please.HEX_to_HSV('#FF0000')).toEqual({h: 0, s: 1, v: 1});
  });
});

describe("Please.HSV_to_HEX", function () {
  it("correctly converts HSV objects into hex strings", function () {
    expect(Please.HSV_to_HEX({h: 0, s: 1, v: 1})).toEqual('#ff0000');
  });
});
