const _ = require("lodash");
const consts = require("./consts");

function Chip8() {
  this.memory = null;
  this.v = null; //8bit registers
  this.i = null; //16bit register
  this.pc = null;
  this.sp = null;
  this.display = null;
  this.delayTimer = null;
  this.soundTimer = null;
}

function cloneDecorator(fn) {
  return function(chip8) {
    const newChip8 = _.cloneDeep(chip8);
    fn.call(null, newChip8, ...arguments);
    return Object.freeze(newChip8);
  };
}

function reset(chip8) {
  chip8.memory = Array(4096).fill(0);
  chip8.v = Array(16).fill(0); //8bit registers
  chip8.i = 0; //16bit register
  chip8.pc = 0x200;
  chip8.sp = 0x0;
  chip8.display = Array(64 * 32).fill(0); //video ram
  chip8.delayTimer = 0;
  chip8.soundTimer = 0;
  return chip8;
}

function loadCharset(chip8) {
  for (let i = 0x000; i < 0x050; i++) {
    chip8.memory[i] = consts.charset[i];
  }
  return chip8;
}

function cls(chip8) {
  chip8.display = Array(64 * 32).fill(0);
  return chip8;
}

module.exports = {
  Chip8: Chip8,
  reset: cloneDecorator(reset),
  loadCharset: cloneDecorator(loadCharset),
  cls: cloneDecorator(cls)
};
