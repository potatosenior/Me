// const { minimize } = require("./window.js");

require("./menu.js");
require("./task_bar.js");
const desktopListener = require("./desktop.js");
// require("./window.js");

var windows = [];
console.log("hello world!!");

desktopListener(windows);
