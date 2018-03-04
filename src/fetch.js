function fetch(chip, pc) {
  var pc = pc || chip.pc;
  return (chip.memory[pc] << 8) | chip.memory[pc + 1];
}

module.exports = fetch;
