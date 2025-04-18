import { state } from '../main.js';

export class PostsElement extends HTMLElement {
  constructor() {
    super();
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

    // Créer un élément <c-post> pour chaque post
    for (let post of state.posts) {
      const box = document.createElement('c-post'); // Créer l'élément <c-post>
      box.Content = post.content; // Assigner le contenu du post
      this.appendChild(box); // Ajouter <c-post> dans <c-posts>
    }
  }
}
