import { User } from './models/user.js';
import { displaySignUp } from './components/signup.js';
import { displaySignIn } from './components/signin.js';

export const container = document.querySelector('#container');
export let user = await User.createInstance();

window.onload = async () => {
  // await displaySignUp();
  user.isConnected ? console.log('Connected') : await displaySignIn();
};
