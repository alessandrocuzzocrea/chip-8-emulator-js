const _ = require("lodash");
const consts = require("./consts");

function Chip8() {
  this.memory = null;
  this.v = null; //8bit registers
  this.i = null; //16bit register
  this.pc = null;
  this.stack = null;
  this.display = null;
  this.delayTimer = null;
  this.soundTimer = null;
}

function cloneDecorator(fn) {
  return function(chip8, ...args) {
    const newChip8 = _.cloneDeep(chip8);
    fn.call(null, newChip8, ...args);
    return Object.freeze(newChip8);
  };
}

function reset(chip8) {
  chip8.memory = Array(4096).fill(0);
  chip8.v = new Uint8Array(16); //8bit registers
  chip8.i = 0; //16bit register
  chip8.pc = 0x200;
  chip8.stack = [];
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

function ret(chip8) {
  chip8.pc = chip8.stack.pop();
  return chip8;
}

function jp(chip8, addr) {
  chip8.pc = addr;
  return chip8;
}

function call(chip8, addr) {
  chip8.stack.push(chip8.pc);
  chip8.pc = addr;
  return chip8;
}

function se(chip8, v, byte) {
  if (chip8.v[v] === byte) {
    chip8.pc = chip8.pc + 2;
  }
  return chip8;
}

function sne(chip8, v, byte) {
  if (chip8.v[v] !== byte) {
    chip8.pc = chip8.pc + 2;
  }
  return chip8;
}

function seXY(chip8, x, y) {
  if (chip8.v[x] === chip8.v[y]) {
    chip8.pc = chip8.pc + 2;
  }
  return chip8;
}

function ld(chip8, x, byte) {
  chip8.v[x] = byte;
  return chip8;
}

function add(chip8, x, byte) {
  chip8.v[x] += byte;
  return chip8;
}

function ldXY(chip8, x, y) {
  chip8.v[x] = chip8.v[y];
  return chip8;
}

function orXY(chip8, x, y) {
  chip8.v[x] |= chip8.v[y];
  return chip8;
}

function andXY(chip8, x, y) {
  chip8.v[x] &= chip8.v[y];
  return chip8;
}

function xorXY(chip8, x, y) {
  chip8.v[x] ^= chip8.v[y];
  return chip8;
}

function addXY(chip8, x, y) {
  const sum = chip8.v[x] + chip8.v[y];
  chip8.v[0xf] = sum > 0xff ? 0x01 : 0x00;
  chip8.v[x] = sum;
  return chip8;
}

function subXY(chip8, x, y) {
  const difference = chip8.v[x] - chip8.v[y];
  chip8.v[0xf] = chip8.v[x] > chip8.v[y] ? 0x01 : 0x00;
  chip8.v[x] = difference;
  return chip8;
}

function shrX(chip8, x) {
  const vx = chip8.v[x];
  chip8.v[0xf] = vx & 0b00000001;
  chip8.v[x] = vx >> 1;
  return chip8;
}

module.exports = {
  Chip8: Chip8,
  reset: cloneDecorator(reset),
  loadCharset: cloneDecorator(loadCharset),
  cls: cloneDecorator(cls),
  ret: cloneDecorator(ret),
  jp: cloneDecorator(jp),
  call: cloneDecorator(call),
  se: cloneDecorator(se),
  sne: cloneDecorator(sne),
  seXY: cloneDecorator(seXY),
  ld: cloneDecorator(ld),
  add: cloneDecorator(add),
  ldXY: cloneDecorator(ldXY),
  orXY: cloneDecorator(orXY),
  andXY: cloneDecorator(andXY),
  xorXY: cloneDecorator(xorXY),
  addXY: cloneDecorator(addXY),
  subXY: cloneDecorator(subXY),
  shrX: cloneDecorator(shrX)
};
