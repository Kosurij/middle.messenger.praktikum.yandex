import { renderDOM } from "./utils/renderDOM";
import {LoginPage} from "./pages/login/LoginPage";

document.addEventListener('DOMContentLoaded', () => {
  // const loginPage = new LoginPage({ buttonText: 'Click me'});
  const loginPage = new LoginPage();
  // const registrationPage

  renderDOM('#app', loginPage);

  // setTimeout(() => {
  //   loginPage.setProps({
  //     buttonText: 'Click me please'
  //   })
  // }, 1500)
});
