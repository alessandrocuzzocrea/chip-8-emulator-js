const helpers = require("../src/helpers");

describe("to1D", () => {
  it("convert a 2d coord to 1d", () => {
    expect(helpers.to1D(0, 0)).toEqual(0);
    expect(helpers.to1D(1, 0)).toEqual(1);
    expect(helpers.to1D(63, 0)).toEqual(63);
    expect(helpers.to1D(0, 1)).toEqual(64);
    expect(helpers.to1D(0, 31)).toEqual(1984);
    expect(helpers.to1D(63, 31)).toEqual(2047);
  });
});
