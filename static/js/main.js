import { toggleSignUp } from './components/auth.js';
import { toggleButton } from './components/button.js';

function home() {
  const container = document.createElement('div');
  container.classList = 'container';

  const header = document.createElement('header');
  header.innerHTML = `<h2>Real-Time-Forum</h2>`;
  const button = toggleButton('Login', toggleSignUp);

  header.appendChild(button);
  container.appendChild(header);
  return container;
}

window.onload = () => {
  document.body.appendChild(home());
};
