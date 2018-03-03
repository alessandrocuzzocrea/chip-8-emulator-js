const chip8 = require("./chip8");

let lastPc = 0;

let instructionsDiv;
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
  instructionsDiv = document.querySelector(".instructions");

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
}

function reset() {
  lastPc = 0;
}

function update(chip) {
  function formatDebugString(str, digits, val) {
    return `${str}: ${val
      .toString(16)
      .padStart(digits, "0")
      .toUpperCase()}`;
  }

  function formatHex(num) {
    return num
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();
  }

  // Instructions
  while (instructionsDiv.firstChild) {
    instructionsDiv.removeChild(instructionsDiv.firstChild);
  }

  const currentPc = chip.pc;
  const lastPcDiff = currentPc - lastPc;
  if (lastPcDiff > 18 * 2 || lastPcDiff < 0) {
    lastPc = currentPc;
  }
  let pc = Math.max(lastPc - 2, 0);
  for (let i = 0; i < 20; i++) {
    const el = document.createElement("div");
    el.innerHTML = `${formatHex(pc)}| ${chip8.decode2(chip, pc)}`;

    if (pc === currentPc) {
      el.classList.add("current-instruction");
    }

    instructionsDiv.appendChild(el);
    pc += 2;
  }

  // Registers
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

module.exports = { init, update, reset };
