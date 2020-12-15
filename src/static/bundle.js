(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { createWindow, focus_window } = require("./window.js");

const getTaskbarIconElement = source => {
  return document.querySelector(`.__task_bar_icon[data-target='${source}']`);
};

const openApp = source => {
  const open = document.querySelector(`[data-app='${source}']`);

  if (open) {
    // app ja esta aberto, então foca o mesmo
    let icon = getTaskbarIconElement(source);

    focus_window(open, icon);
    return;
  }

  createWindow(source);
};

const createElementFromHTML = htmlString => {
  // help: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

module.exports = { getTaskbarIconElement, createElementFromHTML, openApp };

},{"./window.js":9}],2:[function(require,module,exports){
const { openApp } = require("./actions.js");

const shortcuts = document.querySelectorAll(".__desktop_icon");
const context_menu = document.querySelector("#__context_menu");

const contextMenuListener = () => {
  const items = context_menu.querySelectorAll("li");

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
    console.log("unfocus all");

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

const animateDesktopShortcuts = () => {
  // faz a animação dos icones da área de trabalho
  let time = 100;

  shortcuts.forEach(shortcut => {
    setTimeout(() => {
      // faz a animação
      shortcut.classList.add("animate");
    }, time);
    time += 40;

    setTimeout(() => {
      // remove a classe de animaçao para poder animar novamente
      shortcut.classList.remove("animate");
    }, time * 2);
    time += 40;
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
  animateDesktopShortcuts();
  contextMenuListener();
  windowAndIconsFocusListeners();
  desktopShortcutsListeners();
};

module.exports = desktopInit;

},{"./actions.js":1}],3:[function(require,module,exports){
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

  return icon_in_doom;
};

module.exports = createIcon;

},{}],4:[function(require,module,exports){
require("./settings_system.js");
require("./actions.js");
const desktop = require("./desktop.js");
const task_bar = require("./task_bar.js");
const menu = require("./menu.js");

desktop();
task_bar();
menu();

console.log("hello world!!!");

},{"./actions.js":1,"./desktop.js":2,"./menu.js":5,"./settings_system.js":6,"./task_bar.js":7}],5:[function(require,module,exports){
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

},{"./actions.js":1}],6:[function(require,module,exports){
const {
  createElementFromHTML,
  getTaskbarIconElement,
} = require("./actions.js");
const { focus_window } = require("./window.js");

const main = document.querySelector("main");

// ---------------------- PERSONALIZE
function changeBackgroundColor(color) {
  main.style.backgroundImage = "none";
  main.style.backgroundColor = color;
}

function loadImg() {
  // cria um URL blob da imagem
  //help: https://stackoverflow.com/questions/44666238/how-to-display-uploaded-image-when-user-clicks-on-a-button
  const url = window.URL.createObjectURL(load_img.files[0]);

  main.style.backgroundImage = `url("${url}")`;
}

function selectColor() {
  changeBackgroundColor(load_color.value);
  document.querySelector(".__load_color").style.backgroundColor =
    load_color.value;
}

const config_personalize = () => {
  const select = document.querySelector("#__config_1").querySelector("select");
  const images = document.querySelector(".__opt_image");
  const colors = document.querySelector(".__opt_colors");

  const load_img = document.querySelector("#load_img");
  const load_color = document.querySelector("#load_color");

  const images_list = images.querySelectorAll("img");
  const colors_list = colors.querySelectorAll("div");

  select.addEventListener("change", () => {
    // mostra as imagens ou cores para serem selecionados

    if (select.value === "Imagem") {
      images.classList.remove("hidden");
      images.classList.add("shown");
      colors.classList.remove("shown");
      colors.classList.add("hidden");
    } else {
      colors.classList.add("shown");
      colors.classList.remove("hidden");
      images.classList.add("hidden");
      images.classList.remove("shown");
    }
  });

  images_list.forEach(img => {
    img.addEventListener("click", () => {
      main.style.backgroundImage = `url("${img.src}")`;
    });
  });

  colors_list.forEach(color => {
    color.addEventListener("click", () => {
      changeBackgroundColor(color.style.backgroundColor);
    });
  });

  load_img.addEventListener("change", loadImg);
  load_color.addEventListener("input", selectColor);
};
// ---------------------------

const configButtonBackHandler = window => {
  // seleciona o template da config
  const config_template = document.querySelector("#config_template");

  // adiciona o conteudo a janela
  window.innerHTML = config_template.textContent;
  // adiciona novamente os listeners da tela de config
  configInit();
};

const configSelect = config => {
  // Adiciona o conteudo da config recebida por param
  // a tela de config

  // seleciona o template base
  let config_base_template = document.querySelector("#config_base").textContent;
  // cria um elemento a partir da base
  let config_base = createElementFromHTML(config_base_template);
  // seleciona o conteudo correto da configuração
  let config_template = document.querySelector(
    `[data-config_template="${config}"]`
  ).textContent;
  // cria um elemento do conteudo
  let config_content = createElementFromHTML(config_template);
  // adiciona o conteudo a base
  config_base.appendChild(config_content);
  // cria a uma div para adicionar tudo
  let final = document.createElement("div");
  final.classList.add("__config_base");
  // adiciona tudo a div
  final.append(config_base);

  // seleciona a janela na DOOM
  let window_cfg = document.querySelector('[data-app="config"');

  let window_content = window_cfg.querySelector(".__window_content");

  // seleciona o icon na DOOM
  let cfg_icon = getTaskbarIconElement("config");

  // atribui o resultado a window config
  window_content.innerHTML = final.innerHTML;

  // inicia os listeners e funções do conteudo da config
  if (config === "personalize") {
    config_personalize();
  }

  // seleciona o botao de voltar ao menu principal
  let button_back = window_content.querySelector(".__config_button_back");

  button_back.addEventListener("click", () =>
    configButtonBackHandler(window_content)
  );
  // foca a janela depois de adiciona-la a DOM
  setTimeout(() => {
    focus_window(window_cfg, cfg_icon);
  }, 10);
};

const configInit = () => {
  // Inicia os listeners de click de cada seção de config
  document.querySelectorAll("[data-config]").forEach(config => {
    config.addEventListener("click", () => {
      configSelect(config.dataset.config);
    });
  });
};

module.exports = configInit;

},{"./actions.js":1,"./window.js":9}],7:[function(require,module,exports){
const date_time = document.getElementById("date_time");
const week_days = [
  "segunda-feira",
  "terçar-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
];
const month_days = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
// data inicial
date_time.innerHTML =
  new Date().getDate() +
  "/" +
  new Date().getMonth() +
  "/" +
  new Date().getFullYear() +
  "<br>" +
  new Date().toLocaleTimeString();

// atualizar a data a cada segundo
setInterval(() => {
  let date = new Date();

  date_time.innerHTML =
    date.getDate() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear() +
    "<br>" +
    date.toLocaleTimeString();

  date_time.title =
    week_days[date.getDay() - 1] +
    ", " +
    date.getDate() +
    " de " +
    month_days[date.getMonth() - 1] +
    " de " +
    date.getFullYear();
}, 1000);

const taskbarListeners = () => {
  const task_bar = document.querySelector("task_bar");

  task_bar.addEventListener("contextmenu", e => e.preventDefault());
};

const taskbarInit = () => {
  taskbarListeners();
};

module.exports = taskbarInit;

},{}],8:[function(require,module,exports){
const { openApp } = require("./actions.js");

const oldPortofioListeners = () => {
  /* 
  detecta cliques dentro do iframe e foca a janela
  help: https://stackoverflow.com/questions/2381336/detect-click-into-iframe-using-javascript
  */
  const iframe = document
    .querySelector(".__old_portfolio")
    .querySelector("iframe");

  window.addEventListener("blur", () => {
    if (document.activeElement === iframe) {
      // simula um click na janela pra foca-la
      document.querySelector('[data-app="old_portfolio"]').click();
    }
  });
};

const trashcanListeners = () => {
  const trashcan = document.querySelector("#trashcan");
  const items = trashcan.querySelectorAll("li");

  trashcan.addEventListener("click", e => {
    // adiciona um listener de click na lixeira para desfocar os items
    // ao clicar fora de algum
    let click_in_item = false;

    items.forEach(item => {
      // percorre todos items e verifica se o clique foi em algum
      if (item.contains(e.target)) click_in_item = true;
    });

    if (!click_in_item) {
      // se o clique nao foi em um item, desfoca todos
      items.forEach(item => {
        item.classList.remove("focused");
      });
    }
  });

  items.forEach(item => {
    item.addEventListener("click", () => {
      // adiciona a classe de focado e retira dos outros
      items.forEach(item2 => {
        item2.classList.remove("focused");
      });

      item.classList.add("focused");
    });

    item.addEventListener("dblclick", () => {
      // abre o app
      let source = item.dataset.target;

      openApp(source);

      if (source === "old_portfolio") {
        // inicia funcoes do portfolio antigo
        oldPortofioListeners();
      }
    });
  });
};

const initTrashcan = () => {
  trashcanListeners();
};

module.exports = initTrashcan;

},{"./actions.js":1}],9:[function(require,module,exports){
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

},{"./icon.js":3,"./settings_system.js":6,"./trashcan.js":8}]},{},[4]);
