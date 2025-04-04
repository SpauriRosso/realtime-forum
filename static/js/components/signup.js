import { container } from '../main.js';

const signupForm = `
<div class="auth-form">
  <form id="signup-form">
    <label for="nickname">Nickname : <input type="text" name="nickname" id="nickname" /></label>
    <label for="age">Date of Birth : <input type="number" name="age" id="age" /></label>
    <label for="gender"
      >Gender :
      <select name="gender" id="gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </label>
    <label for="first-name">First Name : <input type="text" name="first-name" id="first-name" /></label>
    <label for="last-name">Last Name : <input type="text" name="last-name" id="last-name" /></label>
    <label for="email">E-mail : <input type="email" name="email" id="email" /></label>
    <label for="password">Password : <input type="password" name="password" id="password" /></label>
    <button type="submit">Sign Up!</button>
  </form>
</div>
`;

export async function displaySignUp() {
  container.innerHTML = signupForm;

  document.querySelector('#signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      nickname: document.getElementById('nickname').value,
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    const res = await fetch('/api/signup', {
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
