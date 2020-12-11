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
