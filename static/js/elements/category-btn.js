export class CategoryButton extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      gap: "12px",
      position: "absolute",
      top: "89px",
      left: "207px",
      width: "1142px",
      height: "35px",
    });

    // TODO: Fetch categories from API
    const labels = [
      "Excited",
      "Happy",
      "Neutral",
      "Nostalgic",
      "Sad",
      "Depressed",
    ];

    labels.forEach((text) => {
      const button = document.createElement("div");

      Object.assign(button.style, {
        display: "flex",
        width: "170px",
        height: "35px",
        borderRadius: "10px",
        background: "rgba(209,196,233,0.29)",
        border: "1px solid #ffffff",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.53)",
        backdropFilter: "blur(11px)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        fontSize: "16px",
        fontWeight: "500",
        color: "#fff",
        cursor: "pointer",
        userSelect: "none",
      });

      button.innerText = text;
      this.appendChild(button);
    });
  }
}
