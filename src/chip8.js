const _ = require("lodash");
const consts = require("./consts");
const h = require("./helpers");

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

function clone(fn) {
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

function setV(chip8, vi, val) {
  chip8.v[vi] = val;
  return chip8;
}

function setMemory(chip8, addr, val) {
  chip8.memory[addr] = val;
  return chip8;
}

function cls(chip8) {
  chip8.display = Array(64 * 32).fill(0);
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function ret(chip8) {
  chip8.pc = chip8.stack.pop();
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function jp(chip8, addr) {
  chip8.pc = addr;
  chip8.pc = chip8.pc + 0;
  return chip8;
}

function call(chip8, addr) {
  chip8.stack.push(chip8.pc);
  chip8.pc = addr;
  chip8.pc = chip8.pc + 0;
  return chip8;
}

function se(chip8, v, byte) {
  if (chip8.v[v] === byte) {
    chip8.pc += 2;
  }
  chip8.pc += 2;
  return chip8;
}

function sne(chip8, v, byte) {
  if (chip8.v[v] !== byte) {
    chip8.pc += 2;
  }
  chip8.pc += 2;
  return chip8;
}

function seXY(chip8, x, y) {
  if (chip8.v[x] === chip8.v[y]) {
    chip8.pc += 2;
  }
  chip8.pc += 2;
  return chip8;
}

function ld(chip8, x, byte) {
  chip8.v[x] = byte;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function add(chip8, x, byte) {
  chip8.v[x] += byte;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function ldXY(chip8, x, y) {
  chip8.v[x] = chip8.v[y];
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function orXY(chip8, x, y) {
  chip8.v[x] |= chip8.v[y];
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function andXY(chip8, x, y) {
  chip8.v[x] &= chip8.v[y];
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function xorXY(chip8, x, y) {
  chip8.v[x] ^= chip8.v[y];
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function addXY(chip8, x, y) {
  const sum = chip8.v[x] + chip8.v[y];
  chip8.v[0xf] = sum > 0xff ? 0x01 : 0x00;
  chip8.v[x] = sum;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function subXY(chip8, x, y) {
  const difference = chip8.v[x] - chip8.v[y];
  chip8.v[0xf] = chip8.v[x] > chip8.v[y] ? 0x01 : 0x00;
  chip8.v[x] = difference;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function shrX(chip8, x) {
  const vx = chip8.v[x];
  chip8.v[0xf] = vx & 0b00000001;
  chip8.v[x] = vx >> 1;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function subnXY(chip8, x, y) {
  const difference = chip8.v[y] - chip8.v[x];
  chip8.v[0xf] = chip8.v[y] > chip8.v[x] ? 0x01 : 0x00;
  chip8.v[x] = difference;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function shlX(chip8, x) {
  const vx = chip8.v[x];
  chip8.v[0xf] = vx >> 7;
  chip8.v[x] = vx << 1;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function sneXY(chip8, x, y) {
  if (chip8.v[x] !== chip8.v[y]) {
    chip8.pc = chip8.pc + 2;
  }
  return chip8;
}

function ldI(chip8, byte) {
  chip8.i = byte;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function jpV0(chip8, addr) {
  chip8.pc = chip8.v[0] + addr;
  return chip8;
}

function rnd(chip8, x, byte) {
  chip8.v[x] = Math.floor(Math.random() * 256) & byte;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function drw(chip8, x, y, byte) {
  let vf = 0;
  const xCoord = chip8.v[x];
  const yCoord = chip8.v[y];
  const i = chip8.i;

  for (let y = 0; y < byte; y++) {
    const line = chip8.memory[i + y];
    for (let x = 0; x < 8; x++) {
      const val = (line >> (7 - x)) & 0b00000001;
      const index = h.to1D(x + xCoord, y + yCoord);
      const prevVal = chip8.display[index];
      const newVal = val ^ prevVal;
      chip8.display[index] = newVal;
      if (val === 1 && prevVal === 1) {
        vf = 1;
      }
    }
  }
  chip8.v[0xf] = vf;
  chip8.pc = chip8.pc + 2;
  return chip8;
}

function decode(chip, opcode, logger) {
  const a = (opcode & 0b1111000000000000) >> 12;
  const b = (opcode & 0b0000111100000000) >> 8;
  const c = (opcode & 0b0000000011110000) >> 4;
  const d = (opcode & 0b0000000000001111) >> 0;

  //0 Group
  switch (a) {
    case 0x0:
      {
        // 00E0 - CLS
        if (b === 0x0 && c === 0xe && d === 0x0) {
          if (logger) logger.log(`00E0 - CLS`);
          return module.exports.cls(chip);
        }
        // 00EE - RET
        if (b === 0x0 && c === 0xe && d === 0xe) {
          if (logger) logger.log(`00EE - RET`);
          return module.exports.ret(chip);
        }
      }
      break;
    case 0x1: {
      // 1nnn - JP addr
      const nnn = (b << 8) + (c << 4) + d;
      if (logger) logger.log(`1nnn - JP addr: nnn=${nnn.toString(16)}`);
      return module.exports.jp(chip, nnn);
    }
    case 0x2: {
      // 2nnn - CALL addr
      const nnn = (b << 8) + (c << 4) + d;
      if (logger) logger.log(`2nnn - CALL addr: nnn=${nnn.toString(16)}`);
      return module.exports.call(chip, nnn);
    }
    case 0x3: {
      // 3xkk - SE Vx, byte
      const vx = b;
      const byte = (c << 4) + d;
      if (logger)
        logger.log(
          `3xkk - SE Vx, byte: Vx=${vx.toString(16)}, byte=${byte.toString(16)}`
        );
      return module.exports.se(chip, vx, byte);
    }
    case 0x6: {
      // 6xkk - LD Vx, byte
      const vx = b;
      const byte = (c << 4) + d;
      if (logger)
        logger.log(
          `6xkk - LD Vx, byte: Vx=${vx.toString(16)}, byte=${byte.toString(16)}`
        );
      return module.exports.ld(chip, vx, byte);
    }
    case 0x7: {
      // "7xkk - ADD Vx, byte"
      const vx = b;
      const byte = (c << 4) + d;
      if (logger)
        logger.log(
          `7xkk - ADD Vx, byte, byte: Vx=${vx.toString(
            16
          )}, byte=${byte.toString(16)}`
        );
      return module.exports.add(chip, vx, byte);
    }
    case 0xa: {
      // "Annn - LD I, addr"
      const nnn = (b << 8) + (c << 4) + d;
      if (logger) logger.log(`Annn - LD I, addr: nnn=${nnn.toString(16)}`);
      return module.exports.ldI(chip, nnn);
    }
    case 0xd:
      // "Dxyn - DRW Vx, Vy, nibble"
      if (logger)
        logger.log(`Dxyn - DRW Vx, Vy, nibble: Vx=${b}, Vy=${c}, nibble=${d}`);
      return module.exports.drw(chip, b, c, d);
    case 0xc: {
      // Cxkk - RND Vx, byte
      const x = b;
      const byte = (c << 4) + d;
      if (logger)
        logger.log(
          `Cxkk - RND Vx, byte, byte: Vx=${x.toString(
            16
          )}, byte=${byte.toString(16)}`
        );

      return module.exports.rnd(chip, x, byte);
    }
    default:
      break;
  }

  throw new Error(`Illegal opcode: ${opcode.toString(16)}`);
}

function cycle(chip, logger) {
  const { pc, memory } = chip;
  const opcode = (memory[pc] << 8) | memory[pc + 1];
  const args = Array.from(arguments);
  args.splice(1, 0, opcode);
  return module.exports.decode.apply(null, args);
}

function loadRom(chip8, rom) {
  for (let i = 0; i < rom.length; i++) {
    chip8.memory[0x200 + i] = rom[i];
  }
  return chip8;
}

module.exports = {
  Chip8: Chip8,
  reset: clone(reset),
  loadCharset: clone(loadCharset),
  setV: clone(setV),
  setMemory: clone(setMemory),
  decode: decode,
  cycle: cycle,
  loadRom: clone(loadRom),
  cls: clone(cls),
  ret: clone(ret),
  jp: clone(jp),
  call: clone(call),
  se: clone(se),
  sne: clone(sne),
  seXY: clone(seXY),
  ld: clone(ld),
  add: clone(add),
  ldXY: clone(ldXY),
  orXY: clone(orXY),
  andXY: clone(andXY),
  xorXY: clone(xorXY),
  addXY: clone(addXY),
  subXY: clone(subXY),
  shrX: clone(shrX),
  subnXY: clone(subnXY),
  shlX: clone(shlX),
  sneXY: clone(sneXY),
  ldI: clone(ldI),
  jpV0: clone(jpV0),
  rnd: clone(rnd),
  drw: clone(drw)
};
