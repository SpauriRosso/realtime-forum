export class CategoryButton extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
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

    // TODO: Fetch categories from API
  }
}
