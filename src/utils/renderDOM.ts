import Block from "./Block";

export function renderDOM(rootSelector: string, component: Block ): void {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Root not found');
  }

  root.innerHTML = '';

  root.append(component.getContent()!);
}
