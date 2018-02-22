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
    let spyCls, spyldI, spyLd, spyDrw, spyAdd, jpSpy, rndSpy, seSpy, callSpy;

    beforeAll(() => {
      spyCls = jest.spyOn(chip, "cls");
      spyldI = jest.spyOn(chip, "ldI");
      spyLd = jest.spyOn(chip, "ld");
      spyDrw = jest.spyOn(chip, "drw");
      spyAdd = jest.spyOn(chip, "add");
      jpSpy = jest.spyOn(chip, "jp");
      rndSpy = jest.spyOn(chip, "rnd");
      seSpy = jest.spyOn(chip, "se");
      callSpy = jest.spyOn(chip, "call");
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("decode 00E0 correctly", () => {
      chip.decode(afterResetState, 0x00e0);
      expect(spyCls).toBeCalled();
    });

    it("decode 1nnn correctly", () => {
      chip.decode(afterResetState, 0x1228);
      expect(jpSpy).toBeCalled();
    });

    it("decode 2nnn correctly", () => {
      chip.decode(afterResetState, 0x23e6);
      expect(callSpy).toBeCalled();
    });

    it("decode Annn correctly", () => {
      chip.decode(afterResetState, 0xa22a);
      expect(spyldI).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x22a);

      chip.decode(afterResetState, 0xa239);
      expect(spyldI).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x239);
    });

    it("decode 6xkk correctly", () => {
      chip.decode(afterResetState, 0x600c);
      expect(spyLd).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x0, 0xc);

      chip.decode(afterResetState, 0x6108);
      expect(spyLd).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x1, 0x8);
    });

    it("decode Dxyn correctly", () => {
      chip.decode(afterResetState, 0xd01f);
      expect(spyDrw).toHaveBeenCalledWith(
        expect.any(chip.Chip8),
        0x0,
        0x1,
        0xf
      );
    });

    it("decode 7xkk correctly", () => {
      chip.decode(afterResetState, 0x7009);
      expect(spyAdd).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x0, 0x9);
    });

    it("decode c201 correctly", () => {
      chip.decode(afterResetState, 0xc201);
      expect(rndSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x2, 0x1);
    });

    it("decode 3201 correctly", () => {
      chip.decode(afterResetState, 0x3201);
      expect(seSpy).toHaveBeenCalledWith(expect.any(chip.Chip8), 0x2, 0x1);
    });

    it("throws an exception if opcode is illegal", () => {
      expect(() => chip.decode(afterResetState, 0x5001)).toThrowError(
        "Illegal opcode"
      );
    });
  });

  describe("cycle", () => {
    it("calls decode with the correct opcode", () => {
      decodeSpy = jest.spyOn(chip, "decode");

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
