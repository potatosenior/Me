const menu = document.getElementById("_menu");
const menu_icon = document.getElementById("_menu_icon");

document.querySelector("html").addEventListener("click", e => {
  // fecha o menu se ele estiver aberto e o usuario clicar em
  // qualquer lugar que nao seja no menu ou no icone de abrir o menu
  if (
    !document.querySelector("#_menu").contains(e.target) &&
    !document.querySelector("#_menu_icon").contains(e.target)
  ) {
    menu.classList.remove("active");
    menu.classList.add("unactive");

    return;
  }
});

menu_icon.addEventListener("click", () => {
  menu.classList.toggle("active");
  menu.classList.toggle("unactive");

  document.querySelectorAll(".__window").forEach(window => {
    window.classList.remove("focused");
    document
      .querySelectorAll(`[data-target="${window.dataset.app}"]`)
      .forEach(icon => {
        icon.classList.remove("focused");
      });
  });
});
