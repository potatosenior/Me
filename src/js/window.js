const createIcon = require("./icon.js");

const createWindow = source => {
  var configInit = require("./settings_system.js");
  var initTrashcan = require("./trashcan.js");
  // inicia um aplicativo
  const window_template = document.querySelector(`#${source}_template`);

  // CRIA UMA DIV TEMPORARIA PRA INSERIR A JANELA
  let window_tmp = document.createElement("div");

  window_tmp.innerHTML = document.querySelector(
    "#blank_window_template"
  ).textContent;
  // coloca o titulo
  window_tmp.querySelector("span").textContent = window_template.dataset.title;
  // coloca o dataset app
  window_tmp.querySelector("[data-app]").dataset.app = source;
  // adiciona o conteudo do app na janela vazia
  window_tmp.querySelector(".__window_content").innerHTML =
    window_template.textContent;

  // janela ja na DOM
  var window = document
    .querySelector("main")
    .insertAdjacentElement("afterbegin", window_tmp.querySelector("div"));

  if (source == "projects") {
    // adiciona o script do embemed do Twitter
    var script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.head.appendChild(script);
  } else if (source == "config") {
    configInit();
  } else if (source == "trashcan") {
    initTrashcan();
  }

  // CRIA O ICON
  let icon = createIcon(source);

  // ADICIONAR OS LISTENERS
  // seleciona a barra do topo
  const top_bar = window.querySelector(".__window_top_bar");

  // adiciona os listeners da barra do topo
  top_bar
    .querySelector("[data-minimize]")
    .addEventListener("click", () => minimize(window, icon));

  top_bar
    .querySelector("[data-maximize]")
    .addEventListener("click", () => maximize(window, icon));

  top_bar.querySelector("[data-close]").addEventListener("click", () => {
    // remover da DOM
    window.remove();
    icon.remove();
  });

  // listeners da janela
  window.addEventListener("click", () => focus_window(window, icon));
  window.addEventListener("contextmenu", e => e.preventDefault());

  // ---- ICON
  // listeners do icon na barra de tarefas
  icon.addEventListener("click", () => icon_click(window, icon));

  focus_window(window, icon);

  return window;
};

const focus_window = (window, icon) => {
  // console.log("focus!", window, icon);
  if (window.classList.contains("__window_minimized")) return;

  icon.classList.add("focused");
  window.classList.add("focused");
  // last_focused mantem o ultimo elemento no topo da tela mesmo
  // se for desfocado e nenhum outro for focado
  window.classList.add("last_focused");

  document.querySelectorAll(".__window").forEach(window2 => {
    if (window.dataset.app != window2.dataset.app) {
      window2.classList.remove("focused");
      window2.classList.remove("last_focused");
      document
        .querySelectorAll(`[data-target="${window2.dataset.app}"]`)
        .forEach(icon2 => {
          icon2.classList.remove("focused");
        });
    }
  });
};

const unfocus_window = (window, icon) => {
  window.classList.remove("focused");
  icon.classList.remove("focused");
};

const maximize = window => {
  window.classList.toggle("__window_fullscren");
};

const minimize = (window, icon) => {
  window.classList.add("__window_minimized");
  window.classList.remove("last_focused");

  if (window.classList.contains("__window_minimized")) {
    unfocus_window(window, icon);
  }
  /*   window.classList.toggle("__window_minimized");

  if (window.classList.contains("__window_minimized")) {
    unfocus_window(window, icon);
  } else {
    focus_window(window, icon);
  } */
};

const icon_click = (window, icon) => {
  if (window.classList.contains("__window_minimized")) {
    window.classList.remove("__window_minimized");
    focus_window(window, icon);
  } else {
    if (window.classList.contains("focused")) minimize(window, icon);
    else focus_window(window, icon);
  }
};

module.exports = { createWindow, focus_window };
