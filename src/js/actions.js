const { createWindow } = require("./window.js");

const openApp = source => {
  const open = document.querySelector(`[data-app='${source}']`);

  if (open) {
    // app ja esta aberto, então foca o mesmo
    open.classList.remove("__window_minimized");
    open.classList.add("focused");

    document
      .querySelectorAll(".__window")
      .forEach(window => window.classList.remove("last_focused"));

    open.classList.add("last_focused");

    document
      .querySelectorAll(`[data-target='${source}']`)[1]
      .classList.add("focused");

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

module.exports = { createElementFromHTML, openApp };
