import { AppElement } from './elements/app.js';
import { CategoriesElement } from './elements/categories.js';
import { CategoryButton } from './elements/category.js';
import { ChatElement } from './elements/chat.js';
import { CreatePostElement } from './elements/create-post.js';
import { HeaderElement } from './elements/header.js';
import { NavBarButtonElement } from './elements/navbar-button.js';
import { NavBarElement } from './elements/navbar.js';
import { PostElement } from './elements/post.js';
import { PostsElement } from './elements/posts.js';
import { SignInElement } from './elements/signin.js';
import { SignUpElement } from './elements/signup.js';
import { SpacingElement } from './elements/spacing.js';
import { User } from './models/user.js';
import { getPosts } from './utils/posts.js';

export const state = {
  user: new User(localStorage.getItem('session_uuid')),
  posts: await getPosts(),
};

document.body.appendChild(document.createElement('c-app'));

customElements.define('c-app', AppElement);
customElements.define('c-header', HeaderElement);
customElements.define('c-categories', CategoriesElement);
customElements.define('c-category', CategoryButton);
customElements.define('c-posts', PostsElement);
customElements.define('c-post', PostElement);
customElements.define('c-navbar', NavBarElement);
customElements.define('c-navbutton', NavBarButtonElement);
customElements.define('c-signup', SignUpElement);
customElements.define('c-signin', SignInElement);
customElements.define('c-createpost', CreatePostElement);
customElements.define('c-chat', ChatElement);
customElements.define('c-spacing', SpacingElement);
