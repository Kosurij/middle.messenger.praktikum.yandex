import Block from '/src/utils/Block';
import { Button, Dialog, InputFiled, Link } from '/src/components';
import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader';
import { ProfileSidebar } from '../components/ProfileSidebar/ProfileSidebar';
import { ProfileDetailsData } from './components/ProfileDetailsData/ProfileDetailsData';
import { ROUTES } from '/src/const/routes';
import { resourcesReducer, userReducer } from '/src/reducers';
import { TState } from '/src/types';
import { validateForm } from "/src/utils/validation/validateForm";
import AuthController from '/src/controllers/AuthController';
import UserController from "/src/controllers/UserController";
import ResourcesController from "/src/controllers/ResourcesController";
import store from '/src/utils/Store';
import template from './profileDetails.hbs';
import styles from './profileDetails.less';
import defaultAvatar from "/static/user_avatar.svg";

export class ProfileDetailsPage extends Block {
  private userData: TState;
  private userAvatar = '';

  constructor(props: any) {
    super(props);
  }

  protected initChildren() {
    const state = store.getState();

    this.userData = userReducer(state);

    ResourcesController.getResources(this.userData.avatar);

    this.userAvatar = resourcesReducer(state);

    this.children.profileHeader = new ProfileHeader({
      avatar: this.userAvatar || defaultAvatar,
      first_name: this.userData?.first_name,
      events: {
        click: () => this.showDialog()
      }
  });

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

    this.children.logoutButton = new Button({
      label: 'Выйти',
      type: 'button',
      customClass: 'profile__action__logout',
      isGhost: true,
      events: {
        click: () => AuthController.logout()
      }
    });

    this.children.changeAvatarDialog = new Dialog({
      title: 'Загрузите файл',
      content: new InputFiled({
        type: 'file',
        id: 'avatar',
        label: '',
        name: 'avatar',
        value: this.props?.avatar,
        accept: 'image/*',
        customClass: 'fileInput'
      }),
      submit: new Button({
        label: 'Сохранить',
        type: 'submit',
        events: {
          click: () => this.onChangeAvatarSubmit()
        }
      }),
      cancel:  new Button({
        label: 'Отменить',
        type: 'button',
        isGhost: true,
        customClass: 'dialog__actions-cancel',
        events: {
          click: () => this.closeDialog()
        }
      }),
    })
  }

  closeDialog() {
    (this.children.changeAvatarDialog as Dialog).hide();
  }

  showDialog() {
    (this.children.changeAvatarDialog as Dialog).show();
  }

  onChangeAvatarSubmit() {
    const form = document.querySelector('#dialog-form') as HTMLFormElement;

    form.onsubmit = (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement)

      if (validateForm(data)) {
        UserController.changeAvatar(data);

        this.closeDialog();
      }
    }
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
