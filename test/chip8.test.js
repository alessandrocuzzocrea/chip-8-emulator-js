const consts = require("../src/consts");
const decode = require("../src/decode");
const cycle = require("../src/cycle");
const chip = require("../src/chip8");

describe("Chip8", () => {
  const afterNewState = new chip.Chip8();
  const afterResetState = chip.reset(afterNewState);
  const afterLoadCharsetState = chip.loadCharset(afterResetState);

  describe("new Chip8", () => {
    it("has all his members initialized to null", () => {
      const chip8 = afterNewState;

      expect(chip8.i).toEqual(null);
      expect(chip8.memory).toEqual(null);
      expect(chip8.v).toEqual(null);
      expect(chip8.i).toEqual(null);
      expect(chip8.pc).toEqual(null);
      expect(chip8.stack).toEqual(null);
      expect(chip8.display).toEqual(null);
      expect(chip8.delayTimer).toEqual(null);
      expect(chip8.soundTimer).toEqual(null);
    });
  });

  describe("reset", () => {
    it("is initialized after reset", () => {
      const chip8 = afterResetState;

      //Memory
      expect(chip8.memory).toBeInstanceOf(Array);
      expect(chip8.memory).toHaveLength(4096);
      expect(chip8.memory.reduce((acc, v) => acc + v)).toEqual(0);

      //v registers
      expect(chip8.v).toBeInstanceOf(Uint8Array);
      expect(chip8.v).toHaveLength(16);
      expect(chip8.v.reduce((acc, v) => acc + v)).toEqual(0);

      //i register
      expect(chip8.i).toEqual(0);

      //program counter
      expect(chip8.pc).toEqual(0x200);

      //stack
      expect(chip8.stack).toBeInstanceOf(Array);
      expect(chip8.stack).toHaveLength(0);

      //display
      expect(chip8.display).toBeInstanceOf(Array);
      expect(chip8.display).toHaveLength(64 * 32);
      expect(chip8.display.reduce((acc, v) => acc + v)).toEqual(0);

      expect(chip8.delayTimer).toEqual(0);
      expect(chip8.soundTimer).toEqual(0);
    });
  });

  describe("loadCharset", () => {
    const chip8 = afterLoadCharsetState;

    it("loads the charset starting from address 0x000", () => {
      for (let i = 0x000; i < 0x050; i++) {
        expect(chip8.memory[i]).toEqual(consts.charset[i]);
      }
    });

    it("should not change the memory after address 0x1ff", () => {
      for (let i = 0x050; i <= 0xfff; i++) {
        expect(afterLoadCharsetState.memory[i]).toEqual(chip8.memory[i]);
      }
    });
  });

  describe("setV", () => {
    it("sets v[i] register to value v", () => {
      const i = 0;
      const v = 0xff;
      const chip8 = chip.setV(afterResetState, i, v);
      expect(chip8.v[i]).toEqual(v);
      expect(chip8.v[i]).not.toEqual(afterResetState);
    });
  });

  describe("setI", () => {
    it("sets i register to value v", () => {
      const v = 0xff;
      const chip8 = chip.setI(afterResetState, v);
      expect(chip8.i).toEqual(v);
      expect(chip8.i).not.toEqual(afterResetState);
    });
  });

  describe("setMemory", () => {
    it("sets memory[addr] to value v", () => {
      const addr = 0x000;
      const v = 0xff;
      let chip8 = chip.setMemory(afterResetState, addr, v);

      expect(chip8.memory[addr]).toEqual(v);
      expect(chip8.memory[addr]).not.toEqual(afterResetState);
    });
  });

  describe("setDelayTimer", () => {
    it("sets the delayTimer to value v", () => {
      const v = 0xff;
      const chip8 = chip.setDelayTimer(afterResetState, v);
      expect(chip8.delayTimer).toEqual(v);
      expect(chip8.delayTimer).not.toEqual(afterResetState.delayTimer);
    });
  });

  describe("cycle", () => {
    let decodeSpy;

    beforeAll(() => {
      decodeSpy = jest.spyOn(decode, "decode");
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("calls decode with the correct opcode", () => {
      let chip8 = afterResetState;
      const pc = chip8.pc;
      chip8 = chip.setMemory(afterResetState, pc + 0x000, 0x12);
      chip8 = chip.setMemory(chip8, pc + 0x001, 0x34);
      chip8 = cycle(chip8);

      expect(decodeSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x1234);
    });
  });

  describe("loadRom", () => {
    it("loads the rom", () => {
      const IBM = require("../fixtures/IBM");
      const chip8 = chip.loadRom(afterResetState, IBM);

      IBM.forEach((v, i) => {
        expect(chip8.memory[i + 0x200]).toEqual(v);
      });
    });
  });
});
