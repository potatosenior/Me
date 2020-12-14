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
