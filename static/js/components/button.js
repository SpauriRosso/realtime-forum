export function toggleButton(text, onclick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.onclick = onclick;
  return button;
}
