export class ChatElement extends HTMLElement {
  constructor() {
    super();
    this.users = null;
  }

  connectedCallback() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await res.json();
    if (result.code !== 200) {
      // TODO: handle error
      // display a error msg
      return;
    }
    this.users = result.data.users;
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: 'open' });
    Object.assign(this.style, {
      display: 'grid',
      gridTemplateColumns: '15% 1fr',
      gap: '0px 0px',
      height: '600px',
      width: '1200px',
      backgroundColor: 'white',
    });

    // users div
    const users = document.createElement('div');
    Object.assign(users.style, {
      display: 'flex',
      flexDirection: 'column',
    });

    for (let user of this.users) {
      const span = document.createElement('span');
      Object.assign(span.style, {
        padding: '1rem',
        with: '100%',
        textAlign: 'center',
      });
      span.textContent = user.nickname;
      // TODO: event listener for action on click (open chat)
      users.appendChild(span);
    }
    shadow.appendChild(users);
  }
}
