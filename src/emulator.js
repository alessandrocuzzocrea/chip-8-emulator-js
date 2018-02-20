const chip8 = require("./chip8");
const renderer = require("./renderer");

let chip;
let pre;

function init() {
  chip = chip8.loadCharset(chip8.reset(new chip8.Chip8()));
  pre = document.querySelector("pre#emulator");
}

function loadRom(name) {
  return fetch(`/roms/${name}`)
    .then(res => res.arrayBuffer())
    .then(data => {
      chip = chip8.loadRom(chip, new Uint8Array(data));
    });
}

function run() {
  function cycle() {
    chip = chip8.cycle(chip);
    pre.innerHTML = renderer.formatDisplay(chip);
    window.requestAnimationFrame(cycle);
  }
  window.requestAnimationFrame(cycle);
}

module.exports = {
  init,
  loadRom,
  run
};
