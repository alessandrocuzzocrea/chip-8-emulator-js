const chip8 = require("./chip8");

let chip;

function init() {
  chip = chip8.loadCharset(chip8.reset(new chip8.Chip8()));
}

module.exports = {
  init
};
