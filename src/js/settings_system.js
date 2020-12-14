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
