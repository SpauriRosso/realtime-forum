import { User } from './models/user.js';
import { AppElement } from './elements/app.js';
import { SignInElement } from './elements/signin.js';
import { SignUpElement } from './elements/signup.js';
import { NavBarElement } from './elements/navbar.js';

export let user = await User.createInstance();

document.body.appendChild(document.createElement('c-app'));

customElements.define('c-app', AppElement);
customElements.define('c-signup', SignUpElement);
customElements.define('c-signin', SignInElement);
customElements.define('c-navbar', NavBarElement)
