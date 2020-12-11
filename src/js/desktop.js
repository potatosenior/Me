const { openApp } = require("./actions.js");

const shortcuts = document.querySelectorAll(".__desktop_icon");

const windowAndIconsFocusListener = () => {
  document.querySelector(".__desktop").addEventListener("click", e => {
    // desfoca as janelas e os icones na barra de tarefa se clicar fora dos mesmos
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

    if (!click_in_window && !click_in_icon && !click_in_menu_item) {
      // se o clique nao foi em nenhum, desfocar todos
      console.log("unfocus all");

      windows.forEach(window => {
        window.classList.remove("focused");
      });

      icons.forEach(icon => {
        icon.classList.remove("focused");
      });
    }
  });
};

const initDesktopShortcuts = () => {
  let time = 100;

  shortcuts.forEach(shortcut => {
    // INICIALIZA OS ATALHOS NA AREA DE TRABALHO
    setTimeout(() => {
      // adiciona a animação para fazer um efeito de cascada
      shortcut.classList.add("animate");
    }, time);
    time += 40;

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
  windowAndIconsFocusListener();
  initDesktopShortcuts();
};

module.exports = desktopInit;
