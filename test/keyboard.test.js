const _ = require("lodash");
const c = require("../src/consts");
const keyboard = require("../src/keyboard");

describe("keyboard", () => {
  beforeEach(() => {
    keyboard.init();
  });

  it("every button should be initialized to false", () => {
    expect(_.every(_.values(keyboard.getKeys()), _.negate(_.identity))).toEqual(
      true
    );
  });

  it("should call _onKeyDown on key pressed", () => {
    const _onKeyDownSpy = jest.spyOn(keyboard, "_onKeyDown");
    window.dispatchEvent(new KeyboardEvent("keydown"));
    expect(_onKeyDownSpy).toHaveBeenCalledWith("");
  });

  it("should call _onKeyUp on key released", () => {
    const _onKeyUpSpy = jest.spyOn(keyboard, "_onKeyUp");
    window.dispatchEvent(new KeyboardEvent("keyup"));
    expect(_onKeyUpSpy).toHaveBeenCalledWith("");
  });

  describe("setKey", () => {
    it("should set the key to true", () => {
      keyboard.setKey("1", true);
      expect(keyboard.getKeys()["1"]).toEqual(true);
    });

    it("should set the key to false", () => {
      keyboard.setKey("1", true);
      keyboard.setKey("1", false);
      expect(keyboard.getKeys()["1"]).toEqual(false);
    });
  });

  Object.keys(c.keys).forEach(k => {
    const v = c.keys[k];
    describe(`Key ${k}`, () => {
      it("pressed", () => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: v }));
        expect(keyboard.getKeys()[k]).toEqual(true);
      });

      it("released", () => {
        keyboard.setKey(k, true);
        window.dispatchEvent(new KeyboardEvent("keyup", { key: v }));
        expect(keyboard.getKeys()[k]).toEqual(false);
      });
    });
  });
});
