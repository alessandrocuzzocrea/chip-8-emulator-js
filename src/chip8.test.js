const consts = require("./consts");
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
      expect(chip8.display).toEqual(null);
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

      //display
      expect(chip8.display).toBeInstanceOf(Array);
      expect(chip8.display).toHaveLength(64 * 32);
      expect(chip8.display.reduce((acc, v) => acc + v)).toEqual(0);

      expect(chip8.delayTimer).toEqual(0);
      expect(chip8.soundTimer).toEqual(0);
    });
  });

  describe("loadCharset", () => {
    let newState = new chip.Chip8();
    afterResetState = chip.reset(newState);
    afterLoadCharsetState = chip.loadCharset(afterResetState);

    it("loads the charset starting from address 0x000", () => {
      for (let i = 0x000; i < 0x050; i++) {
        expect(afterLoadCharsetState.memory[i]).toEqual(consts.charset[i]);
      }
    });

    it("should not change the memory after address 0x1ff", () => {
      for (let i = 0x050; i <= 0xfff; i++) {
        expect(afterLoadCharsetState.memory[i]).toEqual(
          afterResetState.memory[i]
        );
      }
    });
  });

  describe("opcodes", () => {
    it("CLS - 00E0", () => {
      const initState = chip.reset(new chip.Chip8());

      const newChip = new chip.Chip8();
      newChip.display = Array(64 * 32).fill(1); //video ram

      expect(newChip.display).not.toEqual(initState.display);

      const afterCls = chip.cls(newChip);

      expect(afterCls.display).not.toEqual(newChip.display);
      expect(afterCls.display).toEqual(initState.display);
    });
  });
});
