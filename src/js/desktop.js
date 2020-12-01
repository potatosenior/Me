const { Window } = require("./window.js");

const desktopListener = pilha => {
  document.querySelectorAll(".__desktop_icon").forEach(icon => {
    icon.addEventListener("dblclick", () => {
      // nome unico global
      const source = icon.dataset.source;
      const open = document.querySelector(`[data-app='${source}']`);

      if (open) {
        // app ja esta aberto
        open.classList.remove("__window_minimized");
        return;
      }

      // ---- WINDOW
      const window_template = document.querySelector(`#${source}_template`);

      // CRIA UMA DIV TEMPORARIA PRA INSERIR A JANELA
      let window_tmp = document.createElement("div");

      window_tmp.innerHTML = document.querySelector(
        "#blank_window_template"
      ).textContent;
      // coloca o titulo
      window_tmp.querySelector("span").textContent =
        window_template.dataset.title;
      // coloca o dataset app
      window_tmp.querySelector("[data-app]").dataset.app = source;
      // adiciona o conteudo do app na janela vazia
      window_tmp.querySelector(".__window_content").innerHTML =
        window_template.textContent;

      // janela ja na DOM
      var elem = document
        .querySelector("main")
        .insertAdjacentElement("afterbegin", window_tmp.querySelector("div"));

      elem.classList.add("focused");

      // seleciona o template de icon da barra de tarefas
      const icon_template = document.querySelector(`#${source}_icon`);
      let icon_tmp = document.createElement("div");
      // adiciona as propriedades ao icone
      icon_tmp.classList.add("__task_bar_icon");
      icon_tmp.classList.add("focused");
      icon_tmp.dataset.target = source;
      icon_tmp.innerHTML = icon_template.textContent;

      // insere o icon na barra de tarefas
      var icon_elem = document
        .querySelector("#_taskbar_icons")
        .appendChild(icon_tmp);

      // inicializa o objeto window
      var new_window = new Window(elem, icon_elem);

      const top_bar = elem.querySelector(".__window_top_bar");

      // listeners da janela
      elem.addEventListener("click", () => new_window.focus());

      //adiciona os listeners da barra do topo
      top_bar
        .querySelector("[data-minimize]")
        .addEventListener("click", () => new_window.minimize());

      top_bar
        .querySelector("[data-maximize]")
        .addEventListener("click", () => new_window.maximize());

      top_bar.querySelector("[data-close]").addEventListener("click", () => {
        pilha = pilha.filter(windows => {
          windows != new_window;
        });
        // remover da DOM
        elem.remove();
        icon_elem.remove();
      });

      // listeners do icon na barra de tarefas
      icon_elem.addEventListener("click", () => new_window.minimize());

      pilha.push(new_window);
    });
  });
};

module.exports = desktopListener;