export class HeaderElement extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      alignItems: "center",
      padding: "0 1rem",
      background: "rgba(209, 196, 233, 0.29)",
      borderRadius: "10px",
      border: "1px solid #ffffff",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.53)",
      backdropFilter: "blur(11px)",
      height: "40px",
      userSelect: "none",
      position: "fixed",
      top: "20px",
      left: "20px",
      zIndex: "999",
    });

    const title = document.createElement("div");
    title.innerText = "YouTalk";

    Object.assign(title.style, {
      fontFamily: "Poppins, sans-serif",
      fontSize: "35px",
      lineHeight: "52px",
      fontWeight: "500",
      color: "#fffcfc",
      whiteSpace: "nowrap",
    });

    this.appendChild(title);
  }
}
