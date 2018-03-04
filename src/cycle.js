const fetch = require("./fetch");
const { decode, decode2 } = require("./decode");

function cycle(chip, keyboard) {
  const { pc, memory } = chip;
  const opcode = fetch(chip);
  const args = Array.from(arguments);
  args.splice(1, 0, opcode);
  return decode.apply(null, args);
}

module.exports = cycle;
