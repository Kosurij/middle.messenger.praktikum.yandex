import Block from "/src/utils/Block";
import { Link } from "/src/components";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { ProfileSidebar } from "../components/ProfileSidebar/ProfileSidebar";
import { ProfileDetailsData } from "./components/ProfileDetailsData/ProfileDetailsData";
import { renderDOM } from "/src/utils/renderDOM";
import { ProfileEditPage } from "/src/pages/profile/edit/ProfileEditPage";
import { ChangePasswordPage } from "/src/pages/profile/changePassword/ChangePasswordPage";
import { LoginPage } from "/src/pages/login/LoginPage";
import template from "./profileDetails.hbs";
import styles from "./profileDetails.less";


export class ProfileDetailsPage extends Block {
  protected initChildren() {
    this.children.profileHeader = new ProfileHeader();

    this.children.sidebar = new ProfileSidebar();

    this.children.profileDetailsData = new ProfileDetailsData();

    this.children.changeDataLink = new Link({
      text: 'Изменить данные',
      url: '/editProfile',
      type: 'large',
      events: {
        click: (e) => {
          const profileEditPage = new ProfileEditPage();

          e.preventDefault();

          renderDOM(profileEditPage)
        }
      }
    })

    this.children.changePasswordLink = new Link({
      text: 'Изменить пароль',
      url: '/changePassword',
      type: 'large',
      events: {
        click: (e) => {
          const changePasswordPage = new ChangePasswordPage();

          e.preventDefault();

          renderDOM(changePasswordPage)
        }
      }
    })

    this.children.homeLink = new Link({
      text: 'Выйти',
      url: '/',
      type: 'large',
      customClass: 'profile__action__homeLink',
      events: {
        click: (e) => {
          const loginPage = new LoginPage();

          e.preventDefault();

          renderDOM(loginPage)
        }
      }
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
