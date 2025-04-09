export class AppElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <c-navbar />
    `;
  }
}
