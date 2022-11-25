import Block from "/src/utils/Block";
import { Link } from "/src/components";
import { ProfileHeader } from "../components/ProfileHeader/ProfileHeader";
import { ProfileSidebar } from "../components/ProfileSidebar/ProfileSidebar";
import { ProfileDetailsData } from "./components/ProfileDetailsData/ProfileDetailsData";
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
      type: 'large'
    })

    this.children.changePasswordLink = new Link({
      text: 'Изменить пароль',
      url: '/changePassword',
      type: 'large',
    })

    this.children.homeLink = new Link({
      text: 'Выйти',
      url: '/',
      type: 'large',
      customClass: 'profile__action__homeLink',
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
