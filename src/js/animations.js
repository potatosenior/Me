const logonAnimationDurations = 2000;

const loadingSystemAnimation = () => {
  const logon_animation = document.querySelector("#__logon_animation");
  logon_animation.classList.remove("unactive");

  setTimeout(() => {
    logon_animation.classList.add("unactive");
  }, logonAnimationDurations);
};

const animateDesktopShortcuts = () => {
  // faz a animação dos icones da área de trabalho
  const shortcuts = document.querySelectorAll(".__desktop_icon");
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

const logonAnimations = () => {
  loadingSystemAnimation();

  setTimeout(() => {
    animateDesktopShortcuts();
  }, logonAnimationDurations + 100);
};

module.exports = {
  logonAnimations,
  animateDesktopShortcuts,
};
