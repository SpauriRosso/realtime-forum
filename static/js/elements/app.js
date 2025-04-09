export class AppElement extends HTMLElement {
  constructor() {
    super();
    // header
    // categories
    // posts
    const navbar = document.createElement('c-navbar');
    this.appendChild(navbar);
  }
}
