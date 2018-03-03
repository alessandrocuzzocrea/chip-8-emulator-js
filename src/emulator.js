const chip8 = require("./chip8");
const renderer = require("./renderer");
const keyboard = require("./keyboard");
const logger = require("./logger");
const ui = require("./ui");

let chip;
let rom;
let canvas;
let romSelect;

let running = true;
let reqId = null;

function init() {
  canvas = document.querySelector("#emulator");
  romSelect = document.querySelector("select#rom-select");
  romSelect.onchange = e => loadRom(event.target.value);

  const resetButton = document.querySelector("#reset");
  resetButton.onclick = e => {
    chip = chip8.loadRom(reset(), rom);
  };

  const saveStateButton = document.querySelector("#save-state");
  saveStateButton.onclick = e =>
    window.localStorage.setItem("state", chip8.toJSON(chip));

  const loadStateButton = document.querySelector("#load-state");
  loadStateButton.onclick = e =>
    (chip = chip8.fromJSON(window.localStorage.getItem("state")));

  const pauseButton = document.querySelector("#pause");
  pauseButton.onclick = () => {
    running = false;
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      reqId = null;
    }
  };

  const stepButton = document.querySelector("#step");
  stepButton.onclick = () => {
    if (!running) cycle();
  };

  keyboard.init();
  ui.init();
}

function reset(startRunning = true) {
  running = startRunning;
  if (reqId) {
    window.cancelAnimationFrame(reqId);
    reqId = null;
  }
  ui.reset();
  keyboard.reset();
  logger.reset();
  run();
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
      rom = new Uint8Array(data);
      chip = chip8.loadRom(reset(), rom);
    });
}

function cycle() {
  ui.update(chip);
  chip = chip8.cycle(chip, keyboard, logger);
  renderer.render(chip, canvas);
  chip.delayTimer = Math.max(0, chip.delayTimer - 1);
  if (running) reqId = window.requestAnimationFrame(cycle);
}

function run() {
  window.requestAnimationFrame(cycle);
}

module.exports = {
  init,
  getSelectedRom,
  loadRom,
  run
};
