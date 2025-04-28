import { state } from '../main.js';

export class ChatElement extends HTMLElement {
  constructor() {
    super();
    this.users = null;
    this.selectedUserLi = null;
    this.convDiv = null;
  }

  async connectedCallback() {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      if (result.code !== 200) return;
      this.users = result.data.users;
      this.render();
    } catch (error) {
      console.error('API Error: ', error);
      // TODO: handle error
      // display a error msg
    }
  }

  render() {
    this.classList = 'm-auto flex w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-full md:h-2/3 rounded-2xl overflow-hidden bg-white'; // style for c-chat

    // users list
    const usersListDiv = document.createElement('div');
    usersListDiv.classList = 'w-1/4 h-full bg-gray-100 p-4 overflow-auto';
    this.appendChild(usersListDiv);
    const usersListH2 = document.createElement('h2');
    usersListH2.classList = 'ext-xl font-bold mb-4 text-center';
    usersListH2.textContent = 'Users';
    usersListDiv.appendChild(usersListH2);
    const usersList = document.createElement('ul');
    usersList.classList = 'space-y-3';
    usersListDiv.appendChild(usersList);

    for (let user of this.users) {
      if (user.nickname === state.user.nickname) continue;
      const userLi = document.createElement('li');
      userLi.classList = 'truncate p-2 text-center bg-white rounded-xl shadow hover:bg-gray-200';
      userLi.textContent = user.nickname;
      userLi.title = user.nickname;
      userLi.setAttribute('data-uuid', user.uuid);
      usersList.appendChild(userLi);

      userLi.addEventListener('click', (e) => {
        // remove previous conv + set selected
        this.convDiv?.remove();
        this.selectedUserLi?.classList.remove('selected');
        this.selectedUserLi = e.currentTarget;
        this.selectedUserLi.classList.add('selected');
        // conversation div (messages history + input)
        this.convDiv = document.createElement('div');
        this.convDiv.classList = 'flex flex-col flex-1 bg-gray-50 p-2';
        this.appendChild(this.convDiv);
        // messages div (history, etc...)
        const msgsDiv = document.createElement('div');
        msgsDiv.classList = 'flex flex-col flex-1 justify-end p-4 overflow-y-auto space-y-2';
        this.convDiv.appendChild(msgsDiv);
        // input div (input + submit)
        const input = document.createElement('input');
        input.classList = 'flex p-2 border rounded';
        input.placeholder = `Write to ${this.selectedUserLi.textContent}...`;
        this.convDiv.appendChild(input);

        state.user.socket.onmessage = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.from !== this.selectedUserLi.getAttribute('data-uuid')) {
            // maybe here we need to manage the sending of notifications
            return;
          }
          const msgDiv = document.createElement('div');
          msgDiv.classList = 'w-fit p-2 bg-blue-400 rounded-xl';
          msgDiv.textContent = msg.content;
          msgsDiv.appendChild(msgDiv);
        };
        input.addEventListener('keydown', (e) => {
          const content = input.value.trim();
          if (e.key === 'Enter' && content) {
            const targetUUID = this.selectedUserLi.getAttribute('data-uuid');
            state.user.sendMessage(targetUUID, content);
            input.value = '';
            const msgDiv = document.createElement('div');
            msgDiv.classList = 'w-fit p-2 bg-red-400 rounded-xl self-end';
            msgDiv.textContent = content;
            msgsDiv.appendChild(msgDiv);
          }
        });
      });
    }
  }
}
