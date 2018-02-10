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
      const differentVY = {...initState, v: new Uint8Array([0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])}

      const afterSne2 = chip.seXY(differentVY, 0, 1);
      expect(afterSne2.pc).toEqual(initState.pc);
    });

    it("LD Vx, byte - 6xkk", () => {
      const byte = 0x01;
      const afterLd = chip.ld(initState, 0, byte);
      expect(afterLd.v[0]).toEqual(byte);
      expect(afterLd.v[0]).not.toEqual(initState.v[0]);
    });

    it("ADD Vx, byte - 7xkk", () => {
      const byte = 0x01;
      const afterAdd = chip.add(initState, 0, byte);

      expect(afterAdd.v[0]).toEqual(byte);
      expect(afterAdd.v[0]).not.toEqual(initState.v[0]);
    });

    it("LD Vx, Vy - 8xy0", () => {
      // prettier-ignore
      const chip8 = {...initState, v: new Uint8Array([0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
      const afterLdXY = chip.ldXY(chip8, 0, 1);

      expect(afterLdXY.v[0]).toEqual(afterLdXY.v[1]);
      expect(afterLdXY.v[0]).not.toEqual(initState.v[0]);
    });

    it("OR Vx, Vy - 8xy1", () => {
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b01010101, 0b10101010, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOrXY = chip.orXY(chip8, 0, 1);
        expect(afterOrXY.v[0]).toEqual(0b11111111);
      }
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b01010101, 0b11111111, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOrXY = chip.orXY(chip8, 0, 1);
        expect(afterOrXY.v[0]).toEqual(0b11111111);
      }
    });

    it("AND Vx, Vy - 8xy2", () => {
      // prettier-ignore
      const chip8 = {...initState, v: new Uint8Array([0b01010101, 0b10101010, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
      const afterAndXY = chip.andXY(chip8, 0, 1);

      expect(afterAndXY.v[0]).toEqual(0b00000000);
    });

    it("XOR Vx, Vy - 8xy3", () => {
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b01010101, 0b10101010, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterXorXY = chip.xorXY(chip8, 0, 1);

        expect(afterXorXY.v[0]).toEqual(0b11111111);
      }
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b01010101, 0b10101011, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterXorXY = chip.xorXY(chip8, 0, 1);

        expect(afterXorXY.v[0]).toEqual(0b11111110);
      }
    });

    it("ADD Vx, Vy - 8xy4", () => {
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterAddXY = chip.addXY(chip8, 0, 1);

        expect(afterAddXY.v[0]).toEqual(0x01);
        expect(afterAddXY.v[0xf]).toEqual(0x00);
      }
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0xFF, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterAddXY = chip.addXY(chip8, 0, 1);

        expect(afterAddXY.v[0]).toEqual(0x00);
        expect(afterAddXY.v[0xf]).toEqual(0x01);
      }
    });

    it("SUB Vx, Vy - 8xy5", () => {
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterSubXY = chip.subXY(chip8, 0, 1);

        expect(afterSubXY.v[0]).toEqual(0x01);
        expect(afterSubXY.v[0xf]).toEqual(0x01);
      }
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterSubXY = chip.subXY(chip8, 0, 1);

        expect(afterSubXY.v[0]).toEqual(0xff);
        expect(afterSubXY.v[0xf]).toEqual(0x00);
      }
    });

    it("SHR Vx {, Vy} - 8xy6", () => {
      //TODO: why {, Vy}
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b11111111, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOp = chip.shrX(chip8, 0);

        expect(afterOp.v[0]).toEqual(0b01111111);
        expect(afterOp.v[0xf]).toEqual(0x01);
      }
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b11111110, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOp = chip.shrX(chip8, 0);

        expect(afterOp.v[0]).toEqual(0b01111111);
        expect(afterOp.v[0xf]).toEqual(0x00);
      }
    });

    it("SUBN Vx, Vy - 8xy7", () => {
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOp = chip.subnXY(chip8, 0, 1);

        expect(afterOp.v[0]).toEqual(0x01);
        expect(afterOp.v[0xf]).toEqual(0x01);
      }
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOp = chip.subnXY(chip8, 0, 1);

        expect(afterOp.v[0]).toEqual(0xff);
        expect(afterOp.v[0xf]).toEqual(0x00);
      }
    });

    it("SHL Vx {, Vy} - 8xyE", () => {
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b11111111, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOp = chip.shlX(chip8, 0);

        expect(afterOp.v[0]).toEqual(0b11111110);
        expect(afterOp.v[0xf]).toEqual(0x01);
      }
      {
        // prettier-ignore
        const chip8 = {...initState, v: new Uint8Array([0b01111111, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])};
        const afterOp = chip.shlX(chip8, 0);

        expect(afterOp.v[0]).toEqual(0b11111110);
        expect(afterOp.v[0xf]).toEqual(0x00);
      }
    });

    it("SNE Vx, Vy - 9xy0 - Skip next instruction if Vx != Vy", () => {
      const afterOp1 = chip.sneXY(initState, 0, 1);
      expect(afterOp1.pc).toEqual(initState.pc);

      // prettier-ignore
      const differentVY = {...initState, v: new Uint8Array([0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])}

      const afterOp2 = chip.sneXY(differentVY, 0, 1);
      expect(afterOp2.pc).toEqual(initState.pc + 2);
    });

    it("LD I, addr - Annn", () => {
      const afterOp = chip.ldI(initState, 0xff);
      expect(afterOp.i).toEqual(0xff);
    });
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
