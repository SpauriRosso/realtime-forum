export class AppElement extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflow: "hidden",
    });

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
