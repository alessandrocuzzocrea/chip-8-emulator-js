const chip8 = require("./chip8");
const renderer = require("./renderer");
const keyboard = require("./keyboard");
const logger = require("./logger");

let chip;
let pre;
let romSelect;

function init() {
  pre = document.querySelector("pre#emulator");
  romSelect = document.querySelector("select#rom-select");
  romSelect.onchange = e => loadRom(event.target.value);
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

function run() {
  function cycle() {
    chip = chip8.cycle(chip, keyboard, logger);
    pre.innerHTML = renderer.formatDisplay(chip);
    window.requestAnimationFrame(cycle);
    logger.printLast();
  }
  window.requestAnimationFrame(cycle);
}

module.exports = {
  init,
  getSelectedRom,
  loadRom,
  run
};
