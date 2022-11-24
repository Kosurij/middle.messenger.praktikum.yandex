import { renderDOM } from "./utils/renderDOM";
// import { LoginPage } from "./pages/login/LoginPage";
// import { RegistrationPage } from "./pages/registration/RegistrationPage";
// import { NotFoundPage } from "./pages/404/404Page";
// import { ServerErrorPage } from "./pages/500/ServerErrorPage";
// import { ProfileDetailsPage } from "./pages/profile/details/ProfileDetailsPage";
// import {ProfileEditPage} from "/src/pages/profile/edit/ProfileEditPage";
// import {ChangePasswordPage} from "/src/pages/profile/changePassword/ChangePasswordPage";
import { ChatsPage } from "/src/pages/chats/ChatsPage";

document.addEventListener('DOMContentLoaded', () => {
  // const loginPage = new LoginPage({ buttonText: 'Click me'});
  // const loginPage = new LoginPage();
  // const registrationPage = new RegistrationPage();
  // const notFoundPage = new NotFoundPage();
  // const serverErrorPage = new ServerErrorPage();
  // const profileDetailsPage = new ProfileDetailsPage();
  // const profileEditPage = new ProfileEditPage();
  // const changePasswordPage = new ChangePasswordPage();
  const chatsPage = new ChatsPage();

  renderDOM('#app', chatsPage);

  // setTimeout(() => {
  //   loginPage.setProps({
  //     buttonText: 'Click me please'
  //   })
  // }, 1500)
});
