const { openApp } = require("./actions.js");

const shortcuts = document.querySelectorAll(".__desktop_icon");
const context_menu = document.querySelector("#__context_menu");

const contextMenuListener = () => {
  const items = context_menu.querySelectorAll("li");
  const { animateDesktopShortcuts } = require("./animations.js");

  items.forEach(item => {
    item.addEventListener("click", () => {
      let event = item.dataset.func;

      if (event === "refresh") {
        animateDesktopShortcuts();
      }

      context_menu.classList.remove("active");
    });
  });
};

const unfocusAll = e => {
  // desfoca elementos focados que nao foram clicados
  let click_in_window = false;
  let click_in_icon = false;
  let click_in_menu_item = false;
  let click_in_shortcut = false;
  let menu_items = document.querySelector("#_menu").querySelectorAll("li");
  let windows = document.querySelectorAll(".__window");
  let icons = document.querySelectorAll(`.__task_bar_icon[data-target]`);

  windows.forEach(window => {
    // percorre todas janelas e verifica se o clique foi em alguma
    if (window.contains(e.target)) click_in_window = true;
  });

  icons.forEach(icon => {
    // percorre todos icones e verifica se o clique foi em algum
    if (icon.contains(e.target)) click_in_icon = true;
  });

  menu_items.forEach(item => {
    // percorre todos items do menu
    // tem que fazer isso pra evitar que a janela de config nao abra desfocada
    if (item.contains(e.target)) click_in_menu_item = true;
  });

  shortcuts.forEach(shortcut => {
    // percorre todos atalhos
    if (shortcut.contains(e.target)) click_in_shortcut = true;
  });

  if (!click_in_shortcut) {
    // desfoca todos atalhos se o click nao foi em algum
    shortcuts.forEach(shortcut => {
      shortcut.classList.remove("focused");
    });
  }

  if (!context_menu.contains(e.target)) context_menu.classList.remove("active");

  if (!click_in_window && !click_in_icon && !click_in_menu_item) {
    // se o clique nao foi em nenhum, desfocar todos

    windows.forEach(window => {
      window.classList.remove("focused");
    });

    icons.forEach(icon => {
      icon.classList.remove("focused");
    });
  }
};

const windowAndIconsFocusListeners = () => {
  const desktop = document.querySelector(".__desktop");
  const main = document.querySelector("main");

  main.addEventListener("click", e => {
    unfocusAll(e);
  });

  desktop.addEventListener("contextmenu", e => {
    // TODO
    // abrir o menu pra esquerda se estiver bem na direita
    // abrir pra cima se estiver muito baixo
    e.preventDefault(); // desativa o contextmenu padrao
    unfocusAll(e);
    context_menu.style.left = e.pageX + 1 + "px";
    context_menu.style.top = e.pageY + 1 + "px";

    if (context_menu.classList.contains("active")) {
      return false;
    }

    context_menu.classList.toggle("active");

    return false;
  });
};

const desktopShortcutsListeners = () => {
  shortcuts.forEach(shortcut => {
    // INICIALIZA OS ATALHOS NA AREA DE TRABALHO
    // adiciona o listener de clck para focar o shortcut
    shortcut.addEventListener("click", () => {
      shortcut.classList.add("focused");

      shortcuts.forEach(shortcut2 => {
        if (shortcut !== shortcut2) shortcut2.classList.remove("focused");
      });
    });

    // Adiciona o listener de abrir os aplicativos
    shortcut.addEventListener("dblclick", () => {
      // nome unico global
      const source = shortcut.dataset.source;

      openApp(source);
    });
  });
};

const desktopInit = () => {
  contextMenuListener();
  windowAndIconsFocusListeners();
  desktopShortcutsListeners();
};

module.exports = desktopInit;
