// require("./window.js")();
const date_time = document.getElementById("date_time");

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
  date_time.innerHTML =
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    "/" +
    new Date().getFullYear() +
    "<br>" +
    new Date().toLocaleTimeString();
}, 1000);

document.querySelectorAll(".__task_bar_icon").forEach(icon => {
  if (icon.id !== "_menu_icon") {
    const target = icon.dataset.target;
    const window = document.querySelector(`[data-app="${target}"]`);

    if (target && window)
      icon.addEventListener("click", () => minimize(window));
  }
});
