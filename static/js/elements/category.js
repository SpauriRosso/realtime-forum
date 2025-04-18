import { categories } from '../models/category.js';
import { state } from '../main.js';
import { getPosts } from '../utils/posts.js';

export class CategoryButton extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    Object.assign(this.style, {
      display: 'flex',
      width: '170px',
      height: '35px',
      borderRadius: '10px',
      background: 'rgba(209,196,233,0.29)',
      border: '1px solid #ffffff',
      boxShadow: '0px 4px 4px rgba(0,0,0,0.53)',
      backdropFilter: 'blur(11px)',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '16px',
      fontWeight: '500',
      color: '#fff',
      cursor: 'pointer',
      userSelect: 'none',
    });
  }

  connectedCallback() {
    this.addEventListener('click', async () => {
      if (!categories.includes(this.textContent)) return;
      state.posts = await getPosts(this.textContent);
      const posts = document.querySelector('c-posts');
      posts.render();
    });
  }
}
