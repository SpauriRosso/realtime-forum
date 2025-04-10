import { user } from "../main.js";

export class NavBarElement extends HTMLElement {
  constructor() {
    super();
    this.style.display = "flex";
    this.style.justifyContent = "space-around";
    this.style.alignItems = "center";
    this.style.background = "rgba(209, 196, 233, 0.29)";
    this.style.borderRadius = "0.6em";
    this.style.border = "1px solid #ffffff";
    this.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.53)";
    this.style.backdropFilter = "blur(11px)";
    this.style.height = "calc(2rem + 20px)";
    this.style.position = "absolute"; // tmp
    this.style.bottom = "50px"; // tmp
    this.style.width = "1044px"; // tmp

    const profil = document.createElement("div");
    profil.style.height = "40px";
    profil.style.width = "40px";
    profil.style.backgroundSize = "contain";
    profil.style.borderRadius = "2em";
    profil.style.backgroundImage = 'url("../../assets/profil.jpeg")';
    this.appendChild(profil);

    const usersBtn = document.createElement("c-navbutton");
    usersBtn.onClick = () => displayConnectedUsers();
    usersBtn.img = "../../assets/navbar-users.webp";
    this.appendChild(usersBtn);

    const addPostBtn = document.createElement("c-navbutton");
    addPostBtn.onClick = () => displayAddPost();
    addPostBtn.img = "../../assets/addPostBtn.webp";
    this.appendChild(addPostBtn);

    // notifs bar
    const test = document.createElement("div");
    test.style.backgroundColor = "red";
    test.style.height = "60%";
    test.style.width = "65%";
    this.appendChild(test);
    // end

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
