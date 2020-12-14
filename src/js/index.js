require("./settings_system.js");
require("./actions.js");
const desktop = require("./desktop.js");
const task_bar = require("./task_bar.js");
const menu = require("./menu.js");

desktop();
task_bar();
menu();

console.log("hello world!!!");
