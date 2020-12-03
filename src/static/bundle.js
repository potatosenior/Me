(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { Window } = require("./window.js");
const icons = document.querySelectorAll(".__desktop_icon");

document.querySelector("html").addEventListener("click", e => {
  // desfoca algum icone focado se o usuario clicou em qualquer outra coisa
  let click_in_icon = false;

  icons.forEach(icon => {
    // verifica se o click foi em algum icone
    if (icon.contains(e.target)) click_in_icon = true;
  });

  if (!click_in_icon)
    // se o click nao foi em um icone, remove o focus de todos icones
    icons.forEach(icon => {
      icon.classList.remove("focused");
    });
});

document.querySelector(".__desktop").addEventListener("click", () => {
  document.querySelectorAll(".__window").forEach(window => {
    window.classList.remove("focused");
    document
      .querySelectorAll(`[data-target="${window.dataset.app}"]`)
      .forEach(icon => {
        icon.classList.remove("focused");
      });
  });
});

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.add("focused");

    icons.forEach(icon2 => {
      if (icon !== icon2) icon2.classList.remove("focused");
    });
  });
});

const desktopListener = pilha => {
  icons.forEach(icon => {
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

      // elem.classList.add("focused");

      if (source == "projects") {
        // adiciona o script do embemed do Twitter
        var script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.head.appendChild(script);
      }

      // seleciona o template de icon da barra de tarefas
      const icon_template = document.querySelector(`#${source}_icon`);
      let icon_tmp = document.createElement("div");
      // adiciona as propriedades ao icone
      icon_tmp.classList.add("__task_bar_icon");
      // icon_tmp.classList.add("focused");
      icon_tmp.dataset.target = source;
      icon_tmp.innerHTML = icon_template.textContent;

      // insere o icon na barra de tarefas
      var icon_elem = document
        .querySelector("#_taskbar_icons")
        .appendChild(icon_tmp);

      // inicializa o objeto window
      var new_window = new Window(elem, icon_elem);
      new_window.focus_elem();

      const top_bar = elem.querySelector(".__window_top_bar");

      // listeners da janela
      elem.addEventListener("click", () => new_window.focus_elem());

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
      icon_elem.addEventListener("click", () => new_window.icon_click());

      icons.forEach(icon => {
        icon.classList.remove("focused");
      });

      pilha.push(new_window);
    });
  });
};

module.exports = desktopListener;

},{"./window.js":5}],2:[function(require,module,exports){
// const { minimize } = require("./window.js");

require("./menu.js");
require("./task_bar.js");
const desktopListener = require("./desktop.js");
// require("./window.js");

var windows = [];
console.log("hello world!!");

desktopListener(windows);

},{"./desktop.js":1,"./menu.js":3,"./task_bar.js":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
// require("./window.js")();
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

document.querySelectorAll(".__task_bar_icon").forEach(icon => {
  if (icon.id !== "_menu_icon") {
    const target = icon.dataset.target;
    const window = document.querySelector(`[data-app="${target}"]`);

    if (target && window)
      icon.addEventListener("click", () => minimize(window));
  }
});

},{}],5:[function(require,module,exports){
class Window {
  constructor(elem, icon) {
    // this.source = source;
    this.elem = elem;
    this.icon = icon;
  }

  get() {
    return this.elem;
  }

  focus_elem() {
    if (this.elem.classList.contains("__window_minimized")) return;
    this.elem.classList.add("focused");
    this.icon.classList.add("focused");

    document.querySelectorAll(".__window").forEach(window => {
      if (window.dataset.app != this.elem.dataset.app) {
        window.classList.remove("focused");
        document
          .querySelectorAll(`[data-target="${window.dataset.app}"]`)
          .forEach(icon => {
            icon.classList.remove("focused");
          });
      }
    });
  }

  unfocus_elem() {
    console.log("unfocus");
    this.elem.classList.remove("focused");
    this.icon.classList.remove("focused");
  }

  maximize() {
    this.elem.classList.toggle("__window_fullscren");
  }

  minimize() {
    this.elem.classList.toggle("__window_minimized");

    if (this.elem.classList.contains("__window_minimized")) {
      this.unfocus_elem();
    } else {
      this.focus_elem();
    }
  }

  icon_click() {
    if (this.elem.classList.contains("__window_minimized")) {
      this.minimize();
    } else {
      if (this.elem.classList.contains("focused")) this.minimize();
      else this.focus_elem();
    }
  }
}

/* const maximize = e => {
  e.classList.toggle("__window_fullscren");
};

const minimize = e => {
  e.classList.toggle("__window_minimized");
};

module.exports = function () {
  this.maximize = maximize;
  this.minimize = minimize;
}; */
module.exports = { Window };

},{}]},{},[2]);
