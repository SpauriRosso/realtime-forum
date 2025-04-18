export class SignInElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
<form id="signin-form">
  <label for="login">Login : <input type="text" name="login" id="login" /></label>
  <label for="password">Password : <input type="password" name="password" id="password" /></label>
  <button type="submit">Sign In!</button>
</form>
`;
    this.querySelector('#signin-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        login: this.querySelector('#login').value,
        password: this.querySelector('#password').value,
      };
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.code !== 200) {
        // to do
        // display a error msg
        return;
      }

      localStorage.setItem('session_uuid', result.data.session_uuid);
      window.location.href = '/';
    });
  }
}
