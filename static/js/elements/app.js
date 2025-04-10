export class AppElement extends HTMLElement {
  constructor() {
    super();
    // header
    const header = document.createElement("c-header");
    this.appendChild(header);
    // categories
    // posts
    const navbar = document.createElement("c-navbar");
    this.appendChild(navbar);
  }
}
