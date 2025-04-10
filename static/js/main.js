import { User } from "./models/user.js";
import { AppElement } from "./elements/app.js";
import { SignInElement } from "./elements/signin.js";
import { SignUpElement } from "./elements/signup.js";
import { NavBarElement } from "./elements/navbar.js";
import { NavBarButtonElement } from "./elements/navbar-button.js";
import { HeaderElement } from "./elements/header.js";
import { CategoryButton } from "./elements/category.js";
import { PostBox } from "./elements/post.js";
import { CategoriesElement } from "./elements/categories.js";

export let user = await User.createInstance();

document.body.appendChild(document.createElement("c-app"));

customElements.define("c-app", AppElement);
customElements.define("c-signup", SignUpElement);
customElements.define("c-signin", SignInElement);
customElements.define("c-navbar", NavBarElement);
customElements.define("c-navbutton", NavBarButtonElement);
customElements.define("c-header", HeaderElement);
customElements.define("c-categories", CategoriesElement);
customElements.define("c-category", CategoryButton);

customElements.define("c-postbox", PostBox);
