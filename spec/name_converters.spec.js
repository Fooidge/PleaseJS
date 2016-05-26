// XXX: Fails because of bug or bad docs
describe("Please.NAME_to_HEX", function () {
  it("correctly converts a color name into a hex string", function () {
    expect(Please.NAME_to_HEX('red')).toEqual('#ff0000');
  });
});

describe("Please.NAME_to_RGB", function () {
  it("correctly converts a color name into a RGB object", function () {
    expect(Please.NAME_to_RGB('red')).toEqual({r: 255, g: 0, b: 0});
  });
});

describe("Please.NAME_to_HSV", function () {
  it("correctly converts a color name into a HSV object", function () {
    expect(Please.NAME_to_HSV('red')).toEqual({h: 0, s: 1, v: 1});
  });
});
