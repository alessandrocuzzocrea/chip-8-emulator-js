import "./style.scss";

const emulator = require("./emulator");

emulator.init();
emulator.loadRom(emulator.getSelectedRom());
