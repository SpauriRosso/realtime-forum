export class AppElement extends HTMLElement {
  constructor() {
    super();
    this.classList = 'flex w-screen h-screen bg-[url(../assets/background.webp)] bg-cover';

    // header
    const header = document.createElement("c-header");
    this.appendChild(header);
    // categories
    const categories = document.createElement("c-categories");
    this.appendChild(categories);
    // posts
    const posts = document.createElement("c-posts");
    this.appendChild(posts);
    // navbar
    const navbar = document.createElement("c-navbar");
    this.appendChild(navbar);
  }
}
