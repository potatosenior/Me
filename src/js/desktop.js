const { openApp } = require("./actions.js");
const { desktopContextMenuListener } = require("./context_menu.js");

const desktopShortcutsListeners = () => {
  const shortcuts = document.querySelectorAll(".__desktop_icon");

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

  const unfocusShortcuts = e => {
    /* desfoca todos atalhos da area de trabalho se o evento
    nao foi em algum deles
    */
    let click_in_shortcut = false;

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
  };

  document.addEventListener("click", e => unfocusShortcuts(e));
};

const desktopInit = () => {
  desktopContextMenuListener();
  desktopShortcutsListeners();
};

module.exports = desktopInit;
