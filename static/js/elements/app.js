export class AppElement extends HTMLElement {
  constructor() {
    super();
    // header
    const header = document.createElement("c-header");
    this.appendChild(header);
    // categories
    const categories = document.createElement("c-categories");
    this.appendChild(categories);
    // posts
    // navbar
    const navbar = document.createElement("c-navbar");
    this.appendChild(navbar);
  }
}
