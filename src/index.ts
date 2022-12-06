import { renderPage } from "./utils/renderDOM";

document.addEventListener('DOMContentLoaded', () => {
  const path = document.location.pathname;

  renderPage(path);
});
