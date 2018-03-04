const cloneDeep = require("lodash/cloneDeep");
const fetch = require("./fetch");
const chiploller = require("./chip8");

function clone(fn) {
  return function(chip8, ...args) {
    const newChip8 = cloneDeep(chip8);
    return fn.call(null, newChip8, ...args);
  };
}

function decode(chip, opcode, keyboard) {
  const a = (opcode >> 12) & 0xf;
  const b = (opcode >> 8) & 0xf;
  const c = (opcode >> 4) & 0xf;
  const d = opcode & 0xf;

  chip.pc += 2;

  //0 Group
  switch (a) {
    case 0x0:
      {
        // 00E0 - CLS
        if (b === 0x0 && c === 0xe && d === 0x0) {
          return chiploller.cls(chip);
        }
        // 00EE - RET
        if (b === 0x0 && c === 0xe && d === 0xe) {
          return chiploller.ret(chip);
        }
      }
      break;
    case 0x1:
      {
        // 1nnn - JP addr
        const nnn = (b << 8) + (c << 4) + d;
        return chiploller.jp(chip, nnn);
      }
      break;

    case 0x2:
      {
        // 2nnn - CALL addr
        const nnn = (b << 8) + (c << 4) + d;
        return chiploller.call(chip, nnn);
      }
      break;

    case 0x3:
      {
        // 3xkk - SE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return chiploller.se(chip, vx, byte);
      }
      break;

    case 0x4:
      {
        // 4xkk - SNE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return chiploller.sne(chip, vx, byte);
      }
      break;

    case 0x6:
      {
        // 6xkk - LD Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return chiploller.ld(chip, vx, byte);
      }
      break;

    case 0x7:
      {
        // "7xkk - ADD Vx, byte"
        const vx = b;
        const byte = (c << 4) + d;
        return chiploller.add(chip, vx, byte);
      }
      break;

    case 0x8:
      // "8xy0 - LD Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        return chiploller.ldXY(chip, vx, vy);
      }
      // "8xy2 - AND Vx, Vy"
      if (d === 0x2) {
        const vx = b;
        const vy = c;
        return chiploller.andXY(chip, vx, vy);
      }
      break;

    case 0x9:
      // "9xy0 - SNE Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        return chiploller.sneXY(chip, vx, vy);
      }
      break;

    case 0xa:
      {
        // "Annn - LD I, addr"
        const nnn = (b << 8) + (c << 4) + d;
        return chiploller.ldI(chip, nnn);
      }
      break;

    case 0xd:
      // "Dxyn - DRW Vx, Vy, nibble"
      return chiploller.drw(chip, b, c, d);
      break;

    case 0xc:
      {
        // Cxkk - RND Vx, byte
        const x = b;
        const byte = (c << 4) + d;
        return chiploller.rnd(chip, x, byte);
      }
      break;
    case 0xe:
      // Ex9E - SKP Vx
      if (c === 0x9 && d === 0xe) {
        const x = b;
        return chiploller.skp(chip, x, keyboard.getKeys());
      }
      // ExA1 - SKNP Vx
      if (c === 0xa && d === 0x1) {
        const x = b;
        return chiploller.sknp(chip, x, keyboard.getKeys());
      }
      break;
    case 0xf:
      // Fx07 - LD Vx, DT
      if (c === 0x0 && d === 0x7) {
        const x = b;
        return chiploller.ldVxDT(chip, x);
      }

      // Fx15 - LD DT, Vx
      if (c === 0x1 && d === 0x5) {
        const x = b;
        return chiploller.ldDTVx(chip, x);
      }
      // Fx1E - ADD I, Vx
      if (c === 0x1 && d === 0xe) {
        const x = b;
        return chiploller.addIVx(chip, x);
      }
      // Fx29
      if (c === 0x2 && d === 0x9) {
        const x = b;
        return chiploller.ldFVx(chip, x);
      }
      // Fx33
      if (c === 0x3 && d === 0x3) {
        const x = b;
        return chiploller.ldB(chip, x);
      }
      // Fx55
      if (c === 0x5 && d === 0x5) {
        const x = b;
        return chiploller.ldIndirectIVx(chip, x);
      }
      // Fx65
      if (c === 0x6 && d === 0x5) {
        const x = b;
        return chiploller.ldVxIndirectI(chip, x);
      }
      break;
    default:
      break;
  }

  throw new Error(`Illegal opcode: ${opcode.toString(16)}`);
}

function decode2(chip, pc) {
  const opcode = fetch(chip, pc);
  const a = (opcode >> 12) & 0xf;
  const b = (opcode >> 8) & 0xf;
  const c = (opcode >> 4) & 0xf;
  const d = opcode & 0xf;

  //0 Group
  switch (a) {
    case 0x0:
      {
        // 00E0 - CLS
        if (b === 0x0 && c === 0xe && d === 0x0) {
          return "CLS";
        }
        // 00EE - RET
        if (b === 0x0 && c === 0xe && d === 0xe) {
          return "RET";
        }
      }
      break;
    case 0x1:
      {
        // 1nnn - JP addr
        const nnn = (b << 8) + (c << 4) + d;
        return "JP addr";
      }
      break;

    case 0x2:
      {
        // 2nnn - CALL addr
        const nnn = (b << 8) + (c << 4) + d;
        return "CALL addr";
      }
      break;

    case 0x3:
      {
        // 3xkk - SE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return "SE Vx, byte";
      }
      break;

    case 0x4:
      {
        // 4xkk - SNE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return "SNE Vx, byte";
      }
      break;

    case 0x6:
      {
        // 6xkk - LD Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return "LD Vx, byte";
      }
      break;

    case 0x7:
      {
        // "7xkk - ADD Vx, byte"
        const vx = b;
        const byte = (c << 4) + d;
        return "ADD Vx, byte";
      }
      break;

    case 0x8:
      // "8xy0 - LD Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        return "LD Vx, Vy";
      }
      // "8xy2 - AND Vx, Vy"
      if (d === 0x2) {
        const vx = b;
        const vy = c;
        return "AND Vx, Vy";
      }
      break;

    case 0x9:
      // "9xy0 - SNE Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        return "SNE Vx, Vy";
      }
      break;

    case 0xa:
      {
        // "Annn - LD I, addr"
        const nnn = (b << 8) + (c << 4) + d;
        return "LD I, addr";
      }
      break;

    case 0xd:
      // "Dxyn - DRW Vx, Vy, nibble"
      return "DRW Vx, Vy, nibble";
      break;

    case 0xc:
      {
        // Cxkk - RND Vx, byte
        const x = b;
        const byte = (c << 4) + d;
        return "RND Vx, byte";
      }
      break;
    case 0xe:
      // Ex9E - SKP Vx
      if (c === 0x9 && d === 0xe) {
        const x = b;
        return "SKP Vx";
      }
      // ExA1 - SKNP Vx
      if (c === 0xa && d === 0x1) {
        const x = b;
        return "SKNP Vx";
      }
      break;
    case 0xf:
      // Fx07 - LD Vx, DT
      if (c === 0x0 && d === 0x7) {
        const x = b;
        return "LD Vx, DT";
      }

      // Fx15 - LD DT, Vx
      if (c === 0x1 && d === 0x5) {
        const x = b;
        return "LD DT, Vx";
      }
      // Fx1E - ADD I, Vx
      if (c === 0x1 && d === 0xe) {
        const x = b;
        return "ADD I, Vx";
      }
      // Fx29
      if (c === 0x2 && d === 0x9) {
        const x = b;
        return "Fx29";
      }
      // Fx33
      if (c === 0x3 && d === 0x3) {
        const x = b;
        return "Fx33";
      }
      // Fx55
      if (c === 0x5 && d === 0x5) {
        const x = b;
        return "Fx55";
      }
      // Fx65
      if (c === 0x6 && d === 0x5) {
        const x = b;
        return "Fx65";
      }
      break;
    default:
      break;
  }

  return `Illegal opcode: ${opcode.toString(16)}`;
}

module.exports = {
  decode: clone(decode),
  decode2: decode2
};
