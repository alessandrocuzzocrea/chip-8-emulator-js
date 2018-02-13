const helpers = require("../src/helpers");

describe("to1D", () => {
  it("convert a 2d coord to 1d", () => {
    // 1xH
    expect(helpers.to1D(0, 0, 1)).toEqual(0);
    expect(helpers.to1D(0, 1, 1)).toEqual(1);

    // 2xH
    expect(helpers.to1D(0, 0, 2)).toEqual(0);
    expect(helpers.to1D(1, 0, 2)).toEqual(1);
    expect(helpers.to1D(0, 1, 2)).toEqual(2);
    expect(helpers.to1D(1, 1, 2)).toEqual(3);
  });
});
