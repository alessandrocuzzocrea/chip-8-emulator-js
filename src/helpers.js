const c = require("./consts");

function to1D(x, y) {
  return x + y * c.screenWidth;
}

function toBCD(x) {
  if (x >= 256) throw new Error("Can't convert number >= 256");
  if (x < 0) throw new Error("Can't convert number < 0");

  const str = x.toString().padStart(3, "0");
  return [parseInt(str[0], 10), parseInt(str[1], 10), parseInt(str[2], 10)];
}

module.exports = {
  to1D,
  toBCD
};
