let logs = [];

function reset() {
  logs = [];
}
function log(msg) {
  logs.push(msg);
}

function printLast() {
  console.log(logs[logs.length - 1]);
}

module.exports = {
  reset,
  log,
  printLast
};
