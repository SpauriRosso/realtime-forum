export class NavBarElement extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      background: "rgba(209, 196, 233, 0.29)",
      borderRadius: "0.6em",
      border: "1px solid #ffffff",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.53)",
      backdropFilter: "blur(11px)",
      height: "calc(2rem + 20px)",
      width: "1044px",
      position: "fixed",
      bottom: "20px",
      left: "49.6%",
      transform: "translateX(-50%)",
      zIndex: "1000",
    });

    const profil = document.createElement("div");
    Object.assign(profil.style, {
      height: "40px",
      width: "40px",
      backgroundSize: "contain",
      borderRadius: "2em",
      backgroundImage: 'url("../../assets/profil.jpeg")',
    });
    this.appendChild(profil);

    const usersBtn = document.createElement("c-navbutton");
    usersBtn.onClick = () => displayConnectedUsers();
    usersBtn.img = "../../assets/navbar-users.webp";
    this.appendChild(usersBtn);

    const addPostBtn = document.createElement("c-navbutton");
    addPostBtn.onClick = () => displayAddPost();
    addPostBtn.img = "../../assets/addPostBtn.webp";
    this.appendChild(addPostBtn);

    const test = document.createElement("div");
    Object.assign(test.style, {
      backgroundColor: "red",
      height: "60%",
      width: "65%",
    });
    this.appendChild(test);

    const notifsBtn = document.createElement("c-navbutton");
    notifsBtn.onClick = () => displayNotifs();
    notifsBtn.img = "../../assets/navbar-bell.webp";
    this.appendChild(notifsBtn);

    const loginBtn = document.createElement("c-navbutton");
    loginBtn.onClick = () =>
      user.isConnected ? user.logout() : displaySignup();
    loginBtn.img = "../../assets/navbar-connect.webp";
    this.appendChild(loginBtn);
  }
}
