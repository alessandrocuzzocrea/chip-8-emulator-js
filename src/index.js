import "./style.css";

const emulator = require("./emulator");

emulator.init();
emulator.loadRom(emulator.getSelectedRom()).then(() => {
  emulator.run();
});
