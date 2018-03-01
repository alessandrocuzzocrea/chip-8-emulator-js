const c = require("./consts");

const SCALE = 8;

function render(chip, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1abc9c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#2c3e50";

  for (let y = 0; y < c.screenHeight; y++) {
    for (let x = 0; x < c.screenWidth; x++) {
      if (chip.display[x + y * c.screenWidth] !== 0x0) {
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    }
  }
}

module.exports = { render };
