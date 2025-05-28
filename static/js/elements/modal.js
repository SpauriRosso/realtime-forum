export class ModalElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    document.body.style.overflow = 'hidden';
  }

  disconnectedCallback() {
    document.body.style.overflow = ''; // restaure scroll si tu veux bloquer scroll lors de l'ouverture modal
  }

  handleOverlayClick(e) {
    // Fermer modal si clic sur l'overlay uniquement (pas sur le contenu)
    if (e.target === this) {
      this.remove();
    }
  }

  render() {
    this.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
    this.addEventListener('click', this.handleOverlayClick);
  }
}
