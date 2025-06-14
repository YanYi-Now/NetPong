export class LogoutButton {
  private element: HTMLElement | null = null;

  constructor(private onClick: () => void) {}

  render(): HTMLElement {
    if (this.element) return this.element;

    const button = document.createElement('button');
    button.className = 'nav-link';

    button.innerHTML = `
      <span class="w-6 h-6 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
        </svg>
      </span>
    `;

    button.addEventListener('click', this.onClick);

    this.element = button;
    return button;
  }
}