const consts = require("../src/consts");
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
    it("is correctly initialized after reset", () => {
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
});
