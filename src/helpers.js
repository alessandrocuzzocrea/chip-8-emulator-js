const c = require("./consts");

function to1D(x, y) {
  return x + y * c.screenWidth;
}

module.exports = {
  to1D
};
