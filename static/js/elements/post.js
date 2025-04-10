export class PostBox extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      width: "279px",
      height: "188px",
      borderRadius: "10px",
      background: "rgba(209,196,233,0.29)",
      border: "1px solid #ffffff",
      boxShadow: "0px 4px 4px rgba(0,0,0,0.53)",
      backdropFilter: "blur(11px)",
      color: "red",
    });
  }
}
