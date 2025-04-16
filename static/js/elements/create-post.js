import { user } from '../main.js';
import { categories } from '../models/category.js';

export class CreatePostElement extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const form = document.createElement('form');
    // textarea
    const content = document.createElement('textarea');
    content.placeholder = 'I love life!';
    content.style.resize = 'none';
    form.appendChild(content);
    // categories
    const select_label = document.createElement('label');
    select_label.textContent = 'Category: ';
    const select = document.createElement('select');
    this.validOptions = new Set();
    for (let category of categories) {
      const option = document.createElement('option');
      option.textContent = category;
      option.value = category;
      this.validOptions.add(option.value);
      select.appendChild(option);
    }
    select_label.appendChild(select);
    form.appendChild(select_label);
    // submit
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Send!';
    form.appendChild(button);
    this.appendChild(form);

    Object.assign(form.style, {
      display: 'flex',
      flexDirection: 'column',
    });
  }

  connectedCallback() {
    this.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log(this.validOptions);
      const data = {
        content: this.querySelector('textarea').value,
        category: this.querySelector('select').value,
        user: user,
      };
      if (!this.validOptions.has(data.category)) {
        // TODO: handle no valid option (client injection)
        return;
      }
      const res = await fetch('/api/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.code !== 200) {
        // TODO: handle error
        // display a error msg
        return;
      }
    });
  }
}
