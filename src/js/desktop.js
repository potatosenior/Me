const { openApp } = require("./actions.js");

const desktopContextMenuListener = () => {
  /* 
    Adiciona o listener de menucontext do desktop
  */
  const desktop = document.querySelector(".__desktop");
  const shortcuts = document.querySelectorAll(".__desktop_icon");
  const context_menu = document.querySelector("#__context_menu_desktop");
  const items = context_menu.querySelectorAll("li");
  const { animateDesktopShortcuts } = require("./animations.js");

  desktop.addEventListener("contextmenu", e => {
    // TODO
    // abrir o menu pra esquerda se estiver bem na direita
    // abrir pra cima se estiver muito baixo
    e.preventDefault(); // desativa o contextmenu padrao

    let click_in_shortcut = false;

    shortcuts.forEach(shortcut => {
      // percorre todos atalhos
      if (shortcut.contains(e.target)) click_in_shortcut = true;
    });

    if (click_in_shortcut) {
      // nao abre se o click foi em um atalho
      return false;
    }

    context_menu.style.left = e.pageX + 1 + "px";
    context_menu.style.top = e.pageY + 1 + "px";

    if (context_menu.classList.contains("active")) {
      return false;
    }

    context_menu.classList.toggle("active");

    return false;
  });

  items.forEach(item => {
    /* 
    Adiciona os listeners de cada funcao do contextmenu 
    */
    item.addEventListener("click", () => {
      let event = item.dataset.func;

      if (event === "refresh") {
        animateDesktopShortcuts();
      }

      context_menu.classList.remove("active");
    });
  });

  document.addEventListener("click", e => {
    /* 
    listener para fechar o menu se clicar fora dele
    */
    if (!context_menu.contains(e.target))
      context_menu.classList.remove("active");
  });
};

const desktopShortcutsListeners = () => {
  const shortcuts = document.querySelectorAll(".__desktop_icon");
  const context_menu = document.querySelector("#__context_menu_shortcut");
  const items = context_menu.querySelectorAll("li");

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

    // Adiciona o listener de context menu
    shortcut.addEventListener("contextmenu", e => {
      e.preventDefault(); // desativa o contextmenu padrao
      context_menu.style.left = e.pageX + 1 + "px";
      context_menu.style.top = e.pageY + 1 + "px";

      if (context_menu.classList.contains("active")) {
        return false;
      }

      context_menu.classList.toggle("active");

      // foca o atalho e desfoca os outros
      shortcut.classList.add("focused");
      shortcuts.forEach(shortcut2 => {
        if (shortcut !== shortcut2) shortcut2.classList.remove("focused");
      });

      items.forEach(item => {
        /* 
        Adiciona os listeners de cada funcao do contextmenu 
        */
        let open = () => {
          /* 
          executa a funcao e remove o listener para nao acumular
          */
          let event = item.dataset.func;

          if (event === "open") {
            openApp(shortcut.dataset.source);
          }

          item.removeEventListener("click", open);

          context_menu.classList.remove("active");
        };

        item.addEventListener("click", open);
      });

      return false;
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

  document.addEventListener("click", e => {
    /* 
      listeners para fechar o contexmenu e desfocar o atalho 
      se clicar fora deles
      */
    if (!context_menu.contains(e.target))
      context_menu.classList.remove("active");
    unfocusShortcuts(e);
  });
};

const desktopInit = () => {
  desktopContextMenuListener();
  desktopShortcutsListeners();
};

module.exports = desktopInit;
