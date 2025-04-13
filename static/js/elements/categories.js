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
