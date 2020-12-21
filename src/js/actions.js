const {
  createWindow,
  focus_window,
  destroyAllWindows,
} = require("./window.js");
const { destroyAllIcons } = require("./icon.js");
const { logonAnimations } = require("./animations.js");

const getTaskbarIconElement = source => {
  return document.querySelector(`.__task_bar_icon[data-target='${source}']`);
};

const openApp = source => {
  const open = document.querySelector(`[data-app='${source}']`);

  if (open) {
    // app ja esta aberto, então foca o mesmo
    let icon = getTaskbarIconElement(source);
    open.classList.remove("__window_minimized");

    focus_window(open, icon);
    return;
  }

  createWindow(source);
};

const closeApp = source => {
  /* 
  seleciona o botao de fechar o app e simula um click no mesmo
  */
  const button = document
    .querySelector(`[data-app="${source}"]`)
    .querySelector('[data-close="true"]');
  // simula o click no botao de fechar
  button.dispatchEvent(new MouseEvent("click"));
};

const createElementFromHTML = htmlString => {
  // help: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

const restartSystem = () => {
  logonAnimations();
  // fecha o menu iniciar
  document.getElementById("_menu").classList.remove("active");
  document.getElementById("_menu").classList.add("unactive");
  document.getElementById("_menu_icon").classList.remove("focused");
  // destroi todas janelas
  destroyAllWindows();
  // destroi todos icons
  destroyAllIcons();
};

module.exports = {
  getTaskbarIconElement,
  createElementFromHTML,
  openApp,
  restartSystem,
  closeApp,
};
