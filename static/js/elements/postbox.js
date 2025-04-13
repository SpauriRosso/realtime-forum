export class PostBox extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "246px",
      height: "160px",
      borderRadius: "10px",
      background: "rgba(209,196,233,0.29)",
      border: "1px solid #ffffff",
      boxShadow: "0px 4px 4px rgba(0,0,0,0.53)",
      backdropFilter: "blur(11px)",
      overflow: "hidden",
    });

    const image = document.createElement("div");
    Object.assign(image.style, {
      position: "absolute",
      top: "10px",
      left: "10px",
      width: "226px", // 246 - padding
      height: "115px",
      borderRadius: "10px",
      backgroundImage:
        "url(https://random.danielpetrica.com/api/random?format=thumb)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    });

    const avatar = document.createElement("div");
    Object.assign(avatar.style, {
      position: "absolute",
      top: "130px",
      left: "10px",
      width: "24px",
      height: "24px",
      borderRadius: "12px",
      backgroundImage: `url('../../assets/profil.jpeg')`,
      backgroundSize: "cover",
    });

    const title = document.createElement("div");
    title.textContent = "I'm feeling alone";
    Object.assign(title.style, {
      position: "absolute",
      top: "132px",
      left: "44px",
      fontFamily: "Poppins, sans-serif",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
      color: "#ffffff",
      whiteSpace: "nowrap",
    });

    this.appendChild(image);
    this.appendChild(avatar);
    this.appendChild(title);
  }
}
