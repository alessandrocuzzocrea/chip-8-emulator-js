const c = require("./consts");

function formatDisplay(chip) {
  let out = "";

  for (let y = 0; y < c.screenHeight; y++) {
    for (let x = 0; x < c.screenWidth; x++) {
      if (chip.display[x + y * c.screenWidth] !== 0x0) {
        out += "#";
      } else {
        out += " ";
      }
    }
    out += "\n";
  }
  return out;
}

module.exports = { formatDisplay };
