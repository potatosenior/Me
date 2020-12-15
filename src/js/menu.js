const { openApp } = require("./actions.js");

const menu = document.getElementById("_menu");
const menu_icon = document.getElementById("_menu_icon");

const toggleMenu = () => {
  menu.classList.toggle("active");
  menu.classList.toggle("unactive");
  menu_icon.classList.toggle("focused");
};

const menuListeners = () => {
  // fecha o menu se ele estiver aberto e o usuario clicar em
  // qualquer lugar que nao seja no menu ou no icone de abrir o menu
  document.querySelector("html").addEventListener("click", e => {
    if (
      !document.querySelector("#_menu").contains(e.target) &&
      !document.querySelector("#_menu_icon").contains(e.target)
    ) {
      menu.classList.remove("active");
      menu_icon.classList.remove("focused");
      menu.classList.add("unactive");
    }
  });

  document.querySelector("html").addEventListener("contextmenu", e => {
    if (
      !document.querySelector("#_menu").contains(e.target) &&
      !document.querySelector("#_menu_icon").contains(e.target)
    ) {
      menu.classList.remove("active");
      menu_icon.classList.remove("focused");
      menu.classList.add("unactive");
    }
  });

  menu_icon.addEventListener("click", () => {
    toggleMenu();
  });

  menu.querySelectorAll(".__menu_item").forEach(item => {
    let source = item.dataset.source;

    item.addEventListener("click", () => {
      toggleMenu();
      openApp(source);
    });
  });
};

const menuInit = () => {
  menuListeners();
};

module.exports = menuInit;
