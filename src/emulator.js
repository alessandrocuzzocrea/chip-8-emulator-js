const chip8 = require("./chip8");
const renderer = require("./renderer");
const keyboard = require("./keyboard");
const logger = require("./logger");

let chip;
let pre;
let romSelect;

//debug
let pcDiv,
  iDiv,
  v0Div,
  v1Div,
  v2Div,
  v3Div,
  v4Div,
  v5Div,
  v6Div,
  v7Div,
  v8Div,
  v9Div,
  vaDiv,
  vbDiv,
  vcDiv,
  vdDiv,
  veDiv,
  vfDiv;

function init() {
  pre = document.querySelector("pre#emulator");
  romSelect = document.querySelector("select#rom-select");
  romSelect.onchange = e => loadRom(event.target.value);

  pcDiv = document.querySelector("#pc");
  iDiv = document.querySelector("#i");
  v0Div = document.querySelector("#v0");
  v1Div = document.querySelector("#v1");
  v2Div = document.querySelector("#v2");
  v3Div = document.querySelector("#v3");
  v4Div = document.querySelector("#v4");
  v5Div = document.querySelector("#v5");
  v6Div = document.querySelector("#v6");
  v7Div = document.querySelector("#v7");
  v8Div = document.querySelector("#v8");
  v9Div = document.querySelector("#v9");
  vaDiv = document.querySelector("#va");
  vbDiv = document.querySelector("#vb");
  vcDiv = document.querySelector("#vc");
  vdDiv = document.querySelector("#vd");
  veDiv = document.querySelector("#ve");
  vfDiv = document.querySelector("#vf");

  const saveStateButton = document.querySelector("#save-state");
  saveStateButton.onclick = e =>
    window.localStorage.setItem("state", chip8.toJSON(chip));

  const loadStateButton = document.querySelector("#load-state");
  loadStateButton.onclick = e =>
    (chip = chip8.fromJSON(window.localStorage.getItem("state")));

  keyboard.init();
}

function reset() {
  keyboard.reset();
  logger.reset();
  return chip8.loadCharset(chip8.reset(new chip8.Chip8()));
}

function getSelectedRom() {
  return romSelect.value;
}

function loadRom(name) {
  return fetch(`/roms/${name}`)
    .then(res => res.arrayBuffer())
    .then(data => {
      chip = chip8.loadRom(reset(), new Uint8Array(data));
    });
}

function formatDebugString(str, val) {
  return `${str}: 0x${val
    .toString(16)
    .padStart(4, "0")
    .toUpperCase()}`;
}

function printDebug(chip) {
  pcDiv.innerHTML = formatDebugString("PC", chip.pc);
  iDiv.innerHTML = formatDebugString("I", chip.i);

  v0Div.innerHTML = formatDebugString("V0", chip.v[0]);
  v1Div.innerHTML = formatDebugString("V1", chip.v[1]);
  v2Div.innerHTML = formatDebugString("V2", chip.v[2]);
  v3Div.innerHTML = formatDebugString("V3", chip.v[3]);
  v4Div.innerHTML = formatDebugString("V4", chip.v[4]);
  v5Div.innerHTML = formatDebugString("V5", chip.v[5]);
  v6Div.innerHTML = formatDebugString("V6", chip.v[6]);
  v7Div.innerHTML = formatDebugString("V7", chip.v[7]);
  v8Div.innerHTML = formatDebugString("V8", chip.v[8]);
  v9Div.innerHTML = formatDebugString("V9", chip.v[9]);
  vaDiv.innerHTML = formatDebugString("VA", chip.v[10]);
  vbDiv.innerHTML = formatDebugString("VB", chip.v[11]);
  vcDiv.innerHTML = formatDebugString("VC", chip.v[12]);
  vdDiv.innerHTML = formatDebugString("VD", chip.v[13]);
  veDiv.innerHTML = formatDebugString("VE", chip.v[14]);
  vfDiv.innerHTML = formatDebugString("VF", chip.v[15]);
}

function run() {
  function cycle() {
    chip = chip8.cycle(chip, keyboard, logger);
    pre.innerHTML = renderer.formatDisplay(chip);
    window.requestAnimationFrame(cycle);
    logger.printLast();
    printDebug(chip);
    chip.delayTimer = Math.max(0, chip.delayTimer - 1);
  }
  window.requestAnimationFrame(cycle);
}

module.exports = {
  init,
  getSelectedRom,
  loadRom,
  run
};
