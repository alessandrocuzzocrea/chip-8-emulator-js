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

describe("toBCD", () => {
  it("convert number to BCD", () => {
    //test 1
    let number = 0;
    let res = helpers.toBCD(number);
    expect(res[0]).toEqual(0);
    expect(res[1]).toEqual(0);
    expect(res[2]).toEqual(0);

    //test 2
    number = 1;
    res = helpers.toBCD(number);
    expect(res[0]).toEqual(0);
    expect(res[1]).toEqual(0);
    expect(res[2]).toEqual(1);

    //test 3
    number = 10;
    res = helpers.toBCD(number);
    expect(res[0]).toEqual(0);
    expect(res[1]).toEqual(1);
    expect(res[2]).toEqual(0);

    //test 4
    number = 100;
    res = helpers.toBCD(number);
    expect(res[0]).toEqual(1);
    expect(res[1]).toEqual(0);
    expect(res[2]).toEqual(0);

    //test 5
    number = 111;
    res = helpers.toBCD(number);
    expect(res[0]).toEqual(1);
    expect(res[1]).toEqual(1);
    expect(res[2]).toEqual(1);
  });
});
