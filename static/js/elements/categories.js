export class CategoriesElement extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      width: "1044px",
      height: "50px",
      backgroundColor: "red",
    });

    const labels = [
      "Excited",
      "Happy",
      "Neutral",
      "Nostalgic",
      "Sad",
      "Depressed",
    ];

    labels.forEach((text) => {
      const button = document.createElement("c-category");

      button.textContent = text;
      this.appendChild(button);
    });
  }
}
