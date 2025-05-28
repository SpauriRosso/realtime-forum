export class UsersListElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
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
  }
}
