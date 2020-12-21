require("./settings_system.js");
require("./actions.js");
const desktop = require("./desktop.js");
const task_bar = require("./task_bar.js");
const menu = require("./menu.js");
const context_menu = require("./context_menu.js");
const { logonAnimations } = require("./animations.js");
const { windowsAndIconsListeners } = require("./window.js");

logonAnimations();
desktop();
task_bar();
menu();
context_menu();
windowsAndIconsListeners();

console.log("hello world!!!");
