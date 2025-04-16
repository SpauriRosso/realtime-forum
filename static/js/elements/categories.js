import { categories } from "../models/category.js";

export class CategoriesElement extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "28px",
      width: "1044px",
      margin: "50px auto 0 auto",
      position: "relative",
    });

    categories.forEach((text) => {
      const button = document.createElement("c-category");
      button.textContent = text;
      this.appendChild(button);
    });
  }
}
