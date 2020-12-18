const { createIcon } = require("./icon.js");
var pill = [];

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
    // remove da pilhar
    pill.splice(pill.indexOf(window), 1);
    // remover da DOM
    window.remove();
    icon.remove();
  });

  // listeners da janela
  window.addEventListener("click", () => focus_window(window, icon));
  window.addEventListener("contextmenu", e => {
    // foca a janela se clicar com o botao direito
    e.preventDefault();
    focus_window(window, icon);
  });
  dragElement(window);

  // ---- ICON
  // listeners do icon na barra de tarefas
  icon.addEventListener("click", () => icon_click(window, icon));
  icon.addEventListener("contextmenu", e => {
    // foca a janela se clicar com o botao direito
    e.preventDefault();
    focus_window(window, icon);
  });

  focus_window(window, icon);
  // foca a janela depois de um tempo para garantir
  setTimeout(() => focus_window(window, icon), 10);

  // adiciona a janela no topo da pilha
  pill.unshift(window);

  return window;
};

const windowsAndIconsListeners = () => {
  /* 
    adiciona um listener para qualquer click ou contextmenu 
    que se nao for em uma janela vai desfocar todas
  */
  function unfocusWindowsAndIcons(e) {
    let click_in_window = false;
    let click_in_icon = false;
    let click_in_menu_item = false;
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
      // Verifica e o clique foi em um item do menu
      // tem que fazer isso pra evitar que a janela
      // de config nao abra desfocada
      if (item.contains(e.target)) click_in_menu_item = true;
    });

    if (!click_in_window && !click_in_icon && !click_in_menu_item) {
      // se o clique nao fr em uma janela ou icon, desfoca todas
      windows.forEach(window => {
        window.classList.remove("focused");
      });

      icons.forEach(icon => {
        icon.classList.remove("focused");
      });
    }
  }
  document.addEventListener("click", e => {
    unfocusWindowsAndIcons(e);
  });
  document.addEventListener("contextmenu", e => {
    unfocusWindowsAndIcons(e);
  });
};

const dragElement = elmnt => {
  // help: https://www.w3schools.com/howto/howto_js_draggable.asp
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // Listener para quando usuario mover a topBar
  elmnt
    .querySelector(".__window_top_bar")
    .querySelector("span").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let newX = elmnt.offsetLeft - pos1;
    let newY = elmnt.offsetTop - pos2;

    // evita da janela sair do campo de visão
    if (
      newX >= -elmnt.offsetWidth / 2 &&
      newY >= 0 &&
      newX < window.innerWidth - elmnt.offsetWidth / 2 &&
      newY < window.innerHeight - elmnt.offsetHeight / 2
    ) {
      elmnt.style.top = newY + "px";
      elmnt.style.left = newX + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

const organize_pill = wind => {
  /* 
  Coloca a ultima janela focada no topo da pilha e depois
  percorre a pilha adiciona um zIndex de acordo com a posicao na pilha
  sendo a posicao 0 o topo 
  */
  if (pill) {
    let idx = pill.indexOf(wind);

    // verifica se o elemento já esta na pilha
    if (idx >= 0) {
      // remove o elemento e o adiciona de volto no topo
      pill.splice(pill.indexOf(wind), 1);
      pill.unshift(wind);
    }
    // aplica os Z-index
    pill.forEach((item, index) => {
      item.style.zIndex = 100 - index;
    });
  }
};

const destroyAllWindows = () => {
  /* 
  Remove todas janelas e icones do documento
  */
  document.querySelectorAll(".__window").forEach(elem => {
    elem.remove();
  });

  pill = [];
};

const focus_window = (window, icon) => {
  if (window.classList.contains("__window_minimized")) return;

  icon.classList.add("focused");
  window.classList.add("focused");
  // last_focused mantem o ultimo elemento no topo da tela mesmo
  // se for desfocado e nenhum outro for focado
  window.classList.add("last_focused");

  organize_pill(window);

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

module.exports = {
  createWindow,
  focus_window,
  destroyAllWindows,
  windowsAndIconsListeners,
};
