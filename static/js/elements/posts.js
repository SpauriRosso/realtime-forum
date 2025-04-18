import { posts } from '../main.js';

export class PostsElement extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    Object.assign(this.style, {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      width: '1200px',
      marginTop: '20px',
      paddingBottom: '100px',
    });
    for (let post of posts) {
      const box = document.createElement('c-postbox');
      box.Content = post.content;
      this.appendChild(box);
    }
  }
}
