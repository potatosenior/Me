const menu = document.getElementById("_menu");
const menu_icon = document.getElementById("_menu_icon");

menu_icon.addEventListener("click", () => {
  menu.classList.toggle("active");
  menu.classList.toggle("unactive");
});
