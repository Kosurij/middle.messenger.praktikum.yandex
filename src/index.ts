import { LoginPage } from '/src/pages/login/LoginPage';
import { RegistrationPage } from '/src/pages/registration/RegistrationPage';
import { ProfileDetailsPage } from '/src/pages/profile/details/ProfileDetailsPage';
import { ChatsPage } from '/src/pages/chats/ChatsPage';
import { ProfileEditPage } from '/src/pages/profile/edit/ProfileEditPage';
import { ChangePasswordPage } from '/src/pages/profile/changePassword/ChangePasswordPage';
import { ROUTES } from '/src/const/routes';
import Router from './utils/Router';
import AuthController from "/src/controllers/AuthController";
import './styles/commonStyles.less';

document.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(ROUTES.INDEX, LoginPage)
    .use(ROUTES.REGISTRATION, RegistrationPage)
    .use(ROUTES.PROFILE, ProfileDetailsPage)
    .use(ROUTES.PROFILE_EDIT, ProfileEditPage)
    .use(ROUTES.CHANGE_PASSWORD, ChangePasswordPage)
    .use(ROUTES.CHATS, ChatsPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTES.INDEX:
    case ROUTES.REGISTRATION:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.getUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(ROUTES.PROFILE);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(ROUTES.INDEX);
    }
  }
});
