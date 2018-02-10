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
      expect(chip8.stack).toEqual(null);
      expect(chip8.display).toEqual(null);
      expect(chip8.delayTimer).toEqual(null);
      expect(chip8.soundTimer).toEqual(null);
    });
  });

  describe("reset", () => {
    it("is correctly initialized after reset", () => {
      const chip8 = chip.reset(new chip.Chip8());

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
    afterResetState = chip.reset(new chip.Chip8());
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
    const initState = chip.reset(new chip.Chip8());

    it("CLS - 00E0", () => {
      const chip8 = { ...initState, display: Array(64 * 32).fill(1) };
      const afterCls = chip.cls(chip8);

      expect(chip8.display).not.toEqual(initState.display);
      expect(afterCls.display).not.toEqual(chip8.display);
      expect(afterCls.display).toEqual(initState.display);
    });

    it("RET - 00EE", () => {
      const chip8 = { ...initState, stack: [0x300] };
      const afterRet = chip.ret(chip8);

      expect(chip8.stack).toHaveLength(1);
      expect(afterRet.pc).not.toEqual(initState.pc);
      expect(afterRet.pc).toEqual(0x300);
      expect(afterRet.stack).toHaveLength(0);
    });

    it("JP Addr - 1nnn", () => {
      const jmpAddr = 0x300;
      const afterJp = chip.jp(initState, jmpAddr);

      expect(initState.pc).not.toEqual(jmpAddr);
      expect(afterJp.pc).toEqual(jmpAddr);
    });

    it("CALL Addr - 2nnn", () => {
      const callAddr = 0x300;
      const afterCall = chip.call(initState, callAddr);

      expect(initState.pc).not.toEqual(callAddr);
      expect(afterCall.stack).toHaveLength(initState.stack.length + 1);
      expect(afterCall.stack[afterCall.stack.length - 1]).toEqual(initState.pc);
      expect(afterCall.pc).toEqual(0x300);
    });

    it("SE Vx, byte - 3xkk - Skip next instruction if Vx = kk", () => {
      const afterSe1 = chip.se(initState, 0, 0x00);
      expect(afterSe1.pc).toEqual(initState.pc + 2);

      const afterSe2 = chip.se(initState, 0, 0x01);
      expect(afterSe2.pc).toEqual(initState.pc);
    });

    // 4xkk - SNE Vx, byte
    it("SNE Vx, byte - 4xkk - Skip next instruction if Vx != kk", () => {
      const afterSne1 = chip.sne(initState, 0, 0x00);
      expect(afterSne1.pc).toEqual(initState.pc);

      const afterSne2 = chip.sne(initState, 0, 0x01);
      expect(afterSne2.pc).toEqual(initState.pc + 2);
    });

    it("SE Vx, Vy - 5xy0 - Skip next instruction if Vx = Vy", () => {
      const afterSne1 = chip.seXY(initState, 0, 1);
      expect(afterSne1.pc).toEqual(initState.pc + 2);

      // prettier-ignore
      const differentVY = {...initState, v: [0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,]}

      const afterSne2 = chip.seXY(differentVY, 0, 1);
      expect(afterSne2.pc).toEqual(initState.pc);
    });

    it("LD Vx, byte - 6xkk ", () => {
      const byte = 0x01;
      const afterLd = chip.ld(initState, 0, byte);
      expect(afterLd.v[0]).toEqual(byte);
      expect(afterLd.v[0]).not.toEqual(initState.v[0]);
    });

    // 7xkk - ADD Vx, byte
    // 8xy0 - LD Vx, Vy
    // 8xy1 - OR Vx, Vy
    // 8xy2 - AND Vx, Vy
    // 8xy3 - XOR Vx, Vy
    // 8xy4 - ADD Vx, Vy
    // 8xy5 - SUB Vx, Vy
    // 8xy6 - SHR Vx {, Vy}
    // 8xy7 - SUBN Vx, Vy
    // 8xyE - SHL Vx {, Vy}
    // 9xy0 - SNE Vx, Vy
    // Annn - LD I, addr
    // Bnnn - JP V0, addr
    // Cxkk - RND Vx, byte
    // Dxyn - DRW Vx, Vy, nibble
    // Ex9E - SKP Vx
    // ExA1 - SKNP Vx
    // Fx07 - LD Vx, DT
    // Fx0A - LD Vx, K
    // Fx15 - LD DT, Vx
    // Fx18 - LD ST, Vx
    // Fx1E - ADD I, Vx
    // Fx29 - LD F, Vx
    // Fx33 - LD B, Vx
    // Fx55 - LD [I], Vx
    // Fx65 - LD Vx, [I]
  });
});
