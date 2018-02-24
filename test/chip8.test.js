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

  describe("decode", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("decode 00E0 correctly", () => {
      const clsSpy = jest.spyOn(chip, "cls");

      chip.decode(afterResetState, 0x00e0);
      expect(clsSpy).toBeCalled();
    });

    it("decode 00EE correctly", () => {
      const retSpy = jest.spyOn(chip, "ret");
      chip.decode(afterResetState, 0x00ee);
      expect(retSpy).toBeCalled();
    });

    it("decode 1nnn correctly", () => {
      const jpSpy = jest.spyOn(chip, "jp");

      chip.decode(afterResetState, 0x1228);
      expect(jpSpy).toBeCalled();
    });

    it("decode 2nnn correctly", () => {
      const callSpy = jest.spyOn(chip, "call");

      chip.decode(afterResetState, 0x23e6);
      expect(callSpy).toBeCalled();
    });

    it("decode 4xkk correctly", () => {
      const sneSpy = jest.spyOn(chip, "sne");

      chip.decode(afterResetState, 0x4470);
      expect(sneSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x4, 0x70);
    });

    it("decode Annn correctly", () => {
      const ldISpy = jest.spyOn(chip, "ldI");

      chip.decode(afterResetState, 0xa22a);
      expect(ldISpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x22a);

      chip.decode(afterResetState, 0xa239);
      expect(ldISpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x239);
    });

    it("decode 6xkk correctly", () => {
      const ldSpy = jest.spyOn(chip, "ld");

      chip.decode(afterResetState, 0x600c);
      expect(ldSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x0, 0xc);

      chip.decode(afterResetState, 0x6108);
      expect(ldSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x1, 0x8);
    });

    it("decode Dxyn correctly", () => {
      const drwSpy = jest.spyOn(chip, "drw");

      chip.decode(afterResetState, 0xd01f);
      expect(drwSpy).toHaveBeenCalledWith(
        expect.any(chip.Chip8),
        0x0,
        0x1,
        0xf
      );
    });

    it("decode 7xkk correctly", () => {
      const addSpy = jest.spyOn(chip, "add");

      chip.decode(afterResetState, 0x7009);
      expect(addSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x0, 0x9);
    });

    it("decode c201 correctly", () => {
      const rndSpy = jest.spyOn(chip, "rnd");
      chip.decode(afterResetState, 0xc201);
      expect(rndSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x2, 0x1);
    });

    it("decode 3201 correctly", () => {
      const seSpy = jest.spyOn(chip, "se");

      chip.decode(afterResetState, 0x3201);
      expect(seSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x2, 0x1);
    });

    it("decode fx1e correctly", () => {
      const addIVxSpy = jest.spyOn(chip, "addIVx");

      chip.decode(afterResetState, 0xf41e);
      expect(addIVxSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x4);
    });

    it("throws an exception if opcode is illegal", () => {
      expect(() => chip.decode(afterResetState, 0x5001)).toThrowError(
        "Illegal opcode"
      );
    });

    it("increases PC by 2", () => {
      const clsSpy = jest.spyOn(chip, "cls");
      const chip2 = chip.decode(afterResetState, 0x00e0);
      expect(chip2.pc).toEqual(afterResetState.pc + 2);
    });
  });

  describe("cycle", () => {
    let decodeSpy;

    beforeAll(() => {
      decodeSpy = jest.spyOn(chip, "decode");
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("calls decode with the correct opcode", () => {
      let chip8 = afterResetState;
      const pc = chip8.pc;
      chip8 = chip.setMemory(afterResetState, pc + 0x000, 0x12);
      chip8 = chip.setMemory(chip8, pc + 0x001, 0x34);
      chip8 = chip.cycle(chip8);

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
