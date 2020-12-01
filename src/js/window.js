class Window {
  constructor(elem, icon) {
    // this.source = source;
    this.elem = elem;
    this.icon = icon;
  }

  get() {
    return this.elem;
  }

  maximize() {
    this.elem.classList.toggle("__window_fullscren");
  }

  minimize() {
    this.elem.classList.toggle("__window_minimized");

    if (this.elem.classList.contains("__window_minimized")) {
      this.icon.classList.remove("focused");
      this.elem.classList.remove("focused");
    } else {
      this.elem.classList.add("focused");
      this.icon.classList.add("focused");
    }
  }

  focus() {
    this.elem.classList.add("focused");
    this.icon.classList.add("focused");
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
