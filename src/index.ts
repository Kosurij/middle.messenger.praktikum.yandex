import { renderDOM } from "./utils/renderDOM";
import { LoginPage } from "./pages/login/LoginPage";
import { RegistrationPage } from "./pages/registration/RegistrationPage";
import { NotFoundPage } from "./pages/404/404Page";
import { ServerErrorPage } from "./pages/500/ServerErrorPage";
import { ProfileDetailsPage } from "./pages/profile/details/ProfileDetailsPage";
import {ProfileEditPage} from "/src/pages/profile/edit/ProfileEditPage";
import {ChangePasswordPage} from "/src/pages/profile/changePassword/ChangePasswordPage";

document.addEventListener('DOMContentLoaded', () => {
  // const loginPage = new LoginPage({ buttonText: 'Click me'});
  // const loginPage = new LoginPage();
  // const registrationPage = new RegistrationPage();
  // const notFoundPage = new NotFoundPage();
  // const serverErrorPage = new ServerErrorPage();
  // const profileDetailsPage = new ProfileDetailsPage();
  // const profileEditPage = new ProfileEditPage();
  const changePasswordPage = new ChangePasswordPage();

  renderDOM('#app', changePasswordPage);

  // setTimeout(() => {
  //   loginPage.setProps({
  //     buttonText: 'Click me please'
  //   })
  // }, 1500)
});
