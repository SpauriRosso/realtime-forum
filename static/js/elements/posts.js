export class PostsElement extends HTMLElement {
  constructor() {
    super();

    Object.assign(this.style, {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
      width: "1200px",
      marginTop: "20px",
      paddingBottom: "100px",
    });

    for (let i = 0; i < 24; i++) {
      console.log(i);
      const post = document.createElement("c-postbox");
      this.appendChild(post);
    }
  }
}
