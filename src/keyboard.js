const cloneDeep = require("lodash/cloneDeep");

const c = require("./consts");

let keys;

function init() {
  window.addEventListener("keydown", e => module.exports._onKeyDown(e.key));
  window.addEventListener("keyup", e => module.exports._onKeyUp(e.key));

  reset();
}

function reset() {
  keys = {
    1: false,
    2: false,
    3: false,
    c: false,
    4: false,
    5: false,
    6: false,
    d: false,
    7: false,
    8: false,
    9: false,
    e: false,
    a: false,
    0: false,
    b: false,
    f: false
  };
}

function getKeys() {
  return cloneDeep(keys);
}

function setKey(key, pressed) {
  keys[key] = pressed;
}

function _onKeyDown(key) {
  // prettier-ignore
  switch(key){
    case c.keys["1"]: keys["1"] = true; break;
    case c.keys["2"]: keys["2"] = true; break;
    case c.keys["3"]: keys["3"] = true; break;
    case c.keys["c"]: keys["c"] = true; break;
    case c.keys["4"]: keys["4"] = true; break;
    case c.keys["5"]: keys["5"] = true; break;
    case c.keys["6"]: keys["6"] = true; break;
    case c.keys["d"]: keys["d"] = true; break;
    case c.keys["7"]: keys["7"] = true; break;
    case c.keys["8"]: keys["8"] = true; break;
    case c.keys["9"]: keys["9"] = true; break;
    case c.keys["e"]: keys["e"] = true; break;
    case c.keys["a"]: keys["a"] = true; break;
    case c.keys["0"]: keys["0"] = true; break;
    case c.keys["b"]: keys["b"] = true; break;
    case c.keys["f"]: keys["f"] = true; break;
  }
}

function _onKeyUp(key) {
  // prettier-ignore
  switch(key){
    case c.keys["1"]: keys["1"] = false; break;
    case c.keys["2"]: keys["2"] = false; break;
    case c.keys["3"]: keys["3"] = false; break;
    case c.keys["c"]: keys["c"] = false; break;
    case c.keys["4"]: keys["4"] = false; break;
    case c.keys["5"]: keys["5"] = false; break;
    case c.keys["6"]: keys["6"] = false; break;
    case c.keys["d"]: keys["d"] = false; break;
    case c.keys["7"]: keys["7"] = false; break;
    case c.keys["8"]: keys["8"] = false; break;
    case c.keys["9"]: keys["9"] = false; break;
    case c.keys["e"]: keys["e"] = false; break;
    case c.keys["a"]: keys["a"] = false; break;
    case c.keys["0"]: keys["0"] = false; break;
    case c.keys["b"]: keys["b"] = false; break;
    case c.keys["f"]: keys["f"] = false; break;
  }
}

module.exports = { init, reset, getKeys, setKey, _onKeyDown, _onKeyUp };
