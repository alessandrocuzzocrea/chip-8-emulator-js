const chip8 = require("./chip8");
const renderer = require("./renderer");
const keyboard = require("./keyboard");
const logger = require("./logger");

let chip;
let canvas;
let romSelect;

//debug
let pcDiv,
  iDiv,
  spDiv,
  dtDiv,
  stDiv,
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
  canvas = document.querySelector("#emulator");
  romSelect = document.querySelector("select#rom-select");
  romSelect.onchange = e => loadRom(event.target.value);

  pcDiv = document.querySelector("#pc");
  iDiv = document.querySelector("#i");
  spDiv = document.querySelector("#sp");
  dtDiv = document.querySelector("#dt");
  stDiv = document.querySelector("#st");
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

function getRomPath(name) {
  let path = `/roms/${name}`;
  if (process.env.GHPAGES) {
    path = "https://alessandrocuzzocrea.github.io/chip-8-emulator-js" + path;
  }
  return path;
}

function loadRom(name) {
  return fetch(getRomPath(name))
    .then(res => res.arrayBuffer())
    .then(data => {
      chip = chip8.loadRom(reset(), new Uint8Array(data));
    });
}

function formatDebugString(str, digits, val) {
  return `${str}: 0x${val
    .toString(16)
    .padStart(digits, "0")
    .toUpperCase()}`;
}

function printDebug(chip) {
  pcDiv.innerHTML = formatDebugString("PC", 4, chip.pc);
  iDiv.innerHTML = formatDebugString("I", 4, chip.i);
  spDiv.innerHTML = formatDebugString("SP", 2, chip.stack.length);
  dtDiv.innerHTML = formatDebugString("DT", 2, chip.delayTimer);
  stDiv.innerHTML = formatDebugString("ST", 2, chip.soundTimer);

  v0Div.innerHTML = formatDebugString("V0", 2, chip.v[0]);
  v1Div.innerHTML = formatDebugString("V1", 2, chip.v[1]);
  v2Div.innerHTML = formatDebugString("V2", 2, chip.v[2]);
  v3Div.innerHTML = formatDebugString("V3", 2, chip.v[3]);
  v4Div.innerHTML = formatDebugString("V4", 2, chip.v[4]);
  v5Div.innerHTML = formatDebugString("V5", 2, chip.v[5]);
  v6Div.innerHTML = formatDebugString("V6", 2, chip.v[6]);
  v7Div.innerHTML = formatDebugString("V7", 2, chip.v[7]);
  v8Div.innerHTML = formatDebugString("V8", 2, chip.v[8]);
  v9Div.innerHTML = formatDebugString("V9", 2, chip.v[9]);
  vaDiv.innerHTML = formatDebugString("VA", 2, chip.v[10]);
  vbDiv.innerHTML = formatDebugString("VB", 2, chip.v[11]);
  vcDiv.innerHTML = formatDebugString("VC", 2, chip.v[12]);
  vdDiv.innerHTML = formatDebugString("VD", 2, chip.v[13]);
  veDiv.innerHTML = formatDebugString("VE", 2, chip.v[14]);
  vfDiv.innerHTML = formatDebugString("VF", 2, chip.v[15]);
}

function run() {
  function cycle() {
    chip = chip8.cycle(chip, keyboard, logger);
    renderer.render(chip, canvas);
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
