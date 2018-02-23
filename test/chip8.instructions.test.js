const c = require("../src/consts");
const h = require("../src/helpers");
const chip = require("../src/chip8");

describe("opcodes", () => {
  const initState = chip.reset(new chip.Chip8());

  describe("CLS - 00E0", () => {
    const chip8 = {
      ...initState,
      display: Array(c.screenWidth * c.screenHeight).fill(1)
    };
    const afterCls = chip.cls(chip8);

    it("clears the display", () => {
      expect(chip8.display).not.toEqual(initState.display);
      expect(afterCls.display).not.toEqual(chip8.display);
      expect(afterCls.display).toEqual(initState.display);
    });

    it("increases the pc by 2", () => {
      expect(afterCls.pc).toEqual(chip8.pc + 2);
    });
  });

  describe("RET - 00EE", () => {
    const chip8 = { ...initState, stack: [0x300] };
    const afterRet = chip.ret(chip8);

    it("returns to stack topmost address + 2", () => {
      expect(afterRet.pc).toEqual(0x300 + 2);
      expect(afterRet.pc).not.toEqual(initState.pc);
    });

    it("pops the value from the stack", () => {
      expect(afterRet.stack).toHaveLength(0);
      expect(afterRet.stack).not.toHaveLength(chip8.stack.length);
    });
  });

  describe("JP Addr - 1nnn", () => {
    const jmpAddr = 0x300;
    const afterJp = chip.jp(initState, jmpAddr);

    it("jumps to address", () => {
      expect(initState.pc).not.toEqual(jmpAddr);
      expect(afterJp.pc).toEqual(jmpAddr);
    });
  });

  describe("CALL Addr - 2nnn", () => {
    const callAddr = 0x300;
    const afterCall = chip.call(initState, callAddr);

    it("jumps to address", () => {
      expect(afterCall.pc).toEqual(0x300);
      expect(afterCall.pc).not.toEqual(initState.pc);
    });

    it("pushes previous address to stack", () => {
      expect(afterCall.stack).toHaveLength(1);
      expect(afterCall.stack[0]).toEqual(0x200);
      expect(afterCall.stack).not.toHaveLength(initState.stack.length);
    });
  });

  describe("SE Vx, byte - 3xkk", () => {
    it("Skips next instruction if Vx = kk", () => {
      const afterSe = chip.se(initState, 0, 0x00);
      expect(afterSe.pc).toEqual(initState.pc + 4);
    });

    it("Doesn't skip next instruction if Vx != kk", () => {
      const afterSe = chip.se(initState, 0, 0x01);
      expect(afterSe.pc).toEqual(initState.pc + 2);
    });
  });

  describe("SNE Vx, byte - 4xkk", () => {
    it("Skips next instruction if Vx != kk", () => {
      const afterSne = chip.sne(initState, 0, 0x01);
      expect(afterSne.pc).toEqual(initState.pc + 4);
    });

    it("Doesn't skip next instruction if Vx = kk", () => {
      const afterSne = chip.sne(initState, 0, 0x00);
      expect(afterSne.pc).toEqual(initState.pc + 2);
    });
  });

  describe("SE Vx, Vy - 5xy0", () => {
    it("Skips next instruction if Vx = Vy", () => {
      const afterSne = chip.seXY(initState, 0, 1);
      expect(afterSne.pc).toEqual(initState.pc + 4);
    });

    it("Doesn't skip next instruction if Vx != Vy", () => {
      // prettier-ignore
      const differentVY = {...initState, v: new Uint8Array([0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])}

      const afterSne = chip.seXY(differentVY, 0, 1);
      expect(afterSne.pc).toEqual(initState.pc + 2);
    });
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

  it("JP V0, addr - Bnnn", () => {
    // prettier-ignore
    const chip8 = {...initState, v: new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])}
    const jmpAddr = 0x300;
    const afterOp = chip.jpV0(chip8, jmpAddr);

    expect(afterOp.pc).toEqual(jmpAddr + 0x01);
    expect(afterOp.pc).not.toEqual(initState.pc);
  });

  describe("RND Vx, byte - Cxkk", () => {
    const rndMock = jest.spyOn(Math, "random");
    afterAll(() => {
      rndMock.mockRestore();
    });

    it("sets Vx to a random value between 0 to 255", () => {
      {
        rndMock.mockReturnValue(0.5);
        const afterOp = chip.rnd(initState, 0, 0x01);
        expect(afterOp.v[0]).toEqual(0);
      }
      {
        rndMock.mockReturnValue(0.5);
        const afterOp = chip.rnd(initState, 0, 128);
        expect(afterOp.v[0]).toEqual(128);
      }
      {
        rndMock.mockReturnValue(0.999);
        const afterOp = chip.rnd(initState, 0, 128);
        expect(afterOp.v[0]).toEqual(128);
      }
    });

    it("increases the pc by 2", () => {
      const afterOp = chip.rnd(initState, 0, 0x01);
      expect(afterOp.pc).toEqual(initState.pc + 2);
    });
  });

  describe("DRW Vx, Vy, nibble - Dxyn", () => {
    describe("single pixel", () => {
      const chip8_0 = chip.setMemory(initState, 0x000, 0b10000000);
      const chip8_1 = chip.drw(chip8_0, 0, 0, 1);
      const chip8_2 = chip.drw(chip8_1, 0, 0, 1);

      it("increases the pc by 2", () => {
        expect(chip8_1.pc).toEqual(initState.pc + 2);
      });

      it("draws a pixel at coords 0 0 (first call)", () => {
        expect(chip8_1.display[h.to1D(0, 0)]).toEqual(1);
        expect(chip8_1.display[h.to1D(1, 0)]).toEqual(0);
        expect(chip8_1.display[h.to1D(2, 0)]).toEqual(0);
        expect(chip8_1.display[h.to1D(3, 0)]).toEqual(0);
        expect(chip8_1.display[h.to1D(4, 0)]).toEqual(0);
        expect(chip8_1.display[h.to1D(5, 0)]).toEqual(0);
        expect(chip8_1.display[h.to1D(6, 0)]).toEqual(0);
        expect(chip8_1.display[h.to1D(7, 0)]).toEqual(0);

        expect(chip8_1.display[h.to1D(0, 0)]).not.toEqual(
          initState.display[h.to1D(0, 0)]
        );
      });

      it("sets VF to 0 (first call)", () => {
        expect(chip8_1.v[0xf]).toEqual(0);
      });

      it("clears the pixel at coords 0 0 (second call)", () => {
        expect(chip8_2.display[h.to1D(0, 0)]).toEqual(0);
        expect(chip8_2.display[h.to1D(1, 0)]).toEqual(0);
        expect(chip8_2.display[h.to1D(2, 0)]).toEqual(0);
        expect(chip8_2.display[h.to1D(3, 0)]).toEqual(0);
        expect(chip8_2.display[h.to1D(4, 0)]).toEqual(0);
        expect(chip8_2.display[h.to1D(5, 0)]).toEqual(0);
        expect(chip8_2.display[h.to1D(6, 0)]).toEqual(0);
        expect(chip8_2.display[h.to1D(7, 0)]).toEqual(0);

        expect(chip8_2.display[h.to1D(0, 0)]).toEqual(
          initState.display[h.to1D(0, 0)]
        );
      });

      it("sets VF to 1 (second call)", () => {
        expect(chip8_2.v[0xf]).toEqual(1);
      });
    });

    describe("horizontal pixel row", () => {
      it("draws a line starting at coords 0,0 ending at 0,7", () => {
        let chip8 = chip.setMemory(initState, 0x000, 0b11111111);
        const W = 64;
        chip8 = chip.drw(chip8, 0, 0, 1);

        expect(chip8.display[h.to1D(0, 0, W)]).toEqual(1);
        expect(chip8.display[h.to1D(1, 0, W)]).toEqual(1);
        expect(chip8.display[h.to1D(2, 0, W)]).toEqual(1);
        expect(chip8.display[h.to1D(3, 0, W)]).toEqual(1);
        expect(chip8.display[h.to1D(4, 0, W)]).toEqual(1);
        expect(chip8.display[h.to1D(5, 0, W)]).toEqual(1);
        expect(chip8.display[h.to1D(6, 0, W)]).toEqual(1);
        expect(chip8.display[h.to1D(7, 0, W)]).toEqual(1);

        expect(chip8.display[h.to1D(0, 0, W)]).not.toEqual(
          initState.display[h.to1D(0, 0, W)]
        );
      });
    });
  });
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
