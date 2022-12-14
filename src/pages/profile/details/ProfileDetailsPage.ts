import Block from '/src/utils/Block';
import { Button, Link } from '/src/components';
import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader';
import { ProfileSidebar } from '../components/ProfileSidebar/ProfileSidebar';
import { ProfileDetailsData } from './components/ProfileDetailsData/ProfileDetailsData';
import { ROUTES } from '/src/const/routes';
import { userReducer } from '/src/reducers/reducers';
import { TState } from '/src/types/commonTypes';
import AuthController from '/src/controllers/AuthController';
import template from './profileDetails.hbs';
import styles from './profileDetails.less';
import store from '/src/utils/Store';


export class ProfileDetailsPage extends Block {
  private userData: TState;

  protected initChildren() {
    const state = store.getState();

    this.userData = userReducer(state);

    this.children.profileHeader = new ProfileHeader();

    this.children.sidebar = new ProfileSidebar();

    this.children.profileDetailsData = new ProfileDetailsData(this.userData);

    this.children.changeDataLink = new Link({
      text: 'Изменить данные',
      to: ROUTES.PROFILE_EDIT,
      type: 'large',
    });

    this.children.changePasswordLink = new Link({
      text: 'Изменить пароль',
      to: ROUTES.CHANGE_PASSWORD,
      type: 'large',
    });

    this.children.logoutButton = new Link({
      text: 'Выйти',
      to: ROUTES.INDEX,
      type: 'large',
      customClass: 'profile__action__logout',
    });

    this.children.logoutButton = new Button({
      label: 'Выйти',
      type: 'button',
      customClass: 'profile__action__logout',
      isGhost: true,
      events: {
        click: () => AuthController.logout()
      }
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
