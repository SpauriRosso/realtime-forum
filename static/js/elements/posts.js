import { state } from '../main.js';

export class PostsElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Reset le contenu à chaque appel de render pour ne pas ajouter plusieurs fois les mêmes éléments
    this.innerHTML = '';

    Object.assign(this.style, {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      width: '1200px',
      marginTop: '20px',
      paddingBottom: '100px',
    });

    if (!Array.isArray(state.posts)) return;
    for (let post of state.posts) {
      const box = document.createElement('c-post');
      box.Content = post.content;
      this.appendChild(box);
    }
  }
}
