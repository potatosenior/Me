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
