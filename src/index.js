const emulator = require("./emulator");

emulator.init();
emulator.loadRom("IBM").then(() => {
  emulator.run();
});
