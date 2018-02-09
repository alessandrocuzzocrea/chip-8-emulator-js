const chip = require("./chip8");

describe("Chip8", () => {
  describe("new Chip8", () => {
    it("has all his members initialized to null", () => {
      const chip8 = new chip.Chip8();
      expect(chip8.i).toEqual(null);
      expect(chip8.memory).toEqual(null);
      expect(chip8.v).toEqual(null);
      expect(chip8.i).toEqual(null);
      expect(chip8.pc).toEqual(null);
      expect(chip8.sp).toEqual(null);
      expect(chip8.delayTimer).toEqual(null);
      expect(chip8.soundTimer).toEqual(null);
    });
  });

  describe("reset", () => {
    it("is correctly initialized after reset", () => {
      let chip8 = new chip.Chip8();
      chip8 = chip.reset(chip8);

      //Memory
      expect(chip8.memory).toBeInstanceOf(Array);
      expect(chip8.memory).toHaveLength(4096);
      expect(chip8.memory.reduce((acc, v) => acc + v)).toEqual(0);

      //v registers
      expect(chip8.v).toBeInstanceOf(Array);
      expect(chip8.v).toHaveLength(16);
      expect(chip8.v.reduce((acc, v) => acc + v)).toEqual(0);

      //i register
      expect(chip8.i).toEqual(0);

      expect(chip8.pc).toEqual(0x200);
      expect(chip8.sp).toEqual(0x0);

      expect(chip8.delayTimer).toEqual(0);
      expect(chip8.soundTimer).toEqual(0);
    });
  });

  describe("loadCharset", () => {
    it("load the charset", () => {
      let chip8 = new chip.Chip8();
      chip8 = chip.reset(chip8);
      chip8 = chip.loadCharset(chip8);
    });
  });
});
