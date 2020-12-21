const icons = document.querySelectorAll(".__desktop_icon");

const createIcon = source => {
  // seleciona o template de icon da barra de tarefas
  const icon_template = document.querySelector(`#${source}_icon`);
  let icon_tmp = document.createElement("div");
  // adiciona as propriedades ao icone
  icon_tmp.classList.add("__task_bar_icon");
  // icon_tmp.classList.add("focused");
  icon_tmp.dataset.target = source;
  icon_tmp.innerHTML = icon_template.textContent;

  // insere o icon na barra de tarefas
  var icon_in_doom = document
    .querySelector("#_taskbar_icons")
    .appendChild(icon_tmp);

  icons.forEach(icon => {
    icon.classList.remove("focused");
  });

  icon_in_doom.addEventListener("contextmenu", e => {
    const { closeApp } = require("./actions.js");

    const context_menu = document.querySelector("#__context_menu_icon");
    const items = context_menu.querySelectorAll("li");

    e.preventDefault(); // desativa o contextmenu padrao
    context_menu.style.left = e.pageX + 1 + "px";
    // faz o menu aparecer pra cima
    context_menu.style.top = e.pageY - context_menu.offsetHeight + "px";

    if (context_menu.classList.contains("active")) {
      return false;
    }

    context_menu.classList.toggle("active");

    items.forEach(item => {
      /* 
        Adiciona os listeners de cada funcao do contextmenu 
        */
      let close = () => {
        /* 
          executa a funcao e remove o listener para nao acumular
          */
        let event = item.dataset.func;

        if (event === "close") {
          closeApp(source);
        }

        item.removeEventListener("click", close);

        context_menu.classList.remove("active");
      };

      item.addEventListener("click", close);
    });

    document.addEventListener("click", e => {
      /* 
      listener para fechar o menu se clicar fora dele
      */
      if (!context_menu.contains(e.target))
        context_menu.classList.remove("active");
    });

    return false;
  });

  return icon_in_doom;
};

const destroyAllIcons = () => {
  document.querySelectorAll(".__task_bar_icon").forEach(icon => {
    if (!icon.classList.contains("menu_icon")) icon.remove();
  });
};
module.exports = { createIcon, destroyAllIcons };
