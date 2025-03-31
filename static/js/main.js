import { displaySignIn } from './components/signin.js';
import { displaySignUp } from './components/signup.js';

const container = document.querySelector('#container');

window.onload = () => {
  displaySignIn(container);
};
