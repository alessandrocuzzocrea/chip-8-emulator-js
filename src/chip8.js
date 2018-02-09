const _ = require("lodash");

function Chip8() {

  this.memory = null;
  this.v = null; //8bit registers
  this.i = null; //16bit register
  this.pc = null;
  this.sp = null;
  this.delayTimer = null;
  this.soundTimer = null;
};

function reset(chip8) {
  const newChip8 = _.cloneDeep(chip8);
  newChip8.memory = Array(4096).fill(0);
  newChip8.v = Array(16).fill(0); //8bit registers
  newChip8.i = 0; //16bit register
  newChip8.pc = 0x200;
  newChip8.sp = 0x0;
  newChip8.delayTimer = 0;
  newChip8.soundTimer = 0;
  return newChip8;
};

module.exports = {
  Chip8,
  reset
};
