export class AppElement extends HTMLElement {
  constructor() {
    super();
    // create main
    const main = document.createElement('main');
    // header
    const header = document.createElement('c-header');
    main.appendChild(header);
    // spacing
    const spacing1 = document.createElement('c-spacing');
    main.appendChild(spacing1);
    // categories
    const categories = document.createElement('c-categories');
    main.appendChild(categories);
    // spacing
    const spacing2 = document.createElement('c-spacing');
    main.appendChild(spacing2);
    // posts
    const posts = document.createElement('c-posts');
    main.appendChild(posts);
    // navbar
    const navbar = document.createElement('c-navbar');
    main.appendChild(navbar);
    // add main
    this.appendChild(main);
  }
}
