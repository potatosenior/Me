const { createWindow, focus_window } = require("./window.js");

const getTaskbarIconElement = source => {
  return document.querySelector(`.__task_bar_icon[data-target='${source}']`);
};

const openApp = source => {
  const open = document.querySelector(`[data-app='${source}']`);

  if (open) {
    // app ja esta aberto, então foca o mesmo
    let icon = getTaskbarIconElement(source);

    focus_window(open, icon);
    return;
  }

  createWindow(source);
};

const createElementFromHTML = htmlString => {
  // help: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

module.exports = { getTaskbarIconElement, createElementFromHTML, openApp };
