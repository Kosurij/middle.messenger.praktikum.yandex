import Block from "/src/utils/Block";
import { ProfileHeader } from "/src/pages/profile/components/ProfileHeader/ProfileHeader";
import { ProfileSidebar } from "/src/pages/profile/components/ProfileSidebar/ProfileSidebar";
import { ProfileEditForm } from "/src/pages/profile/edit/components/ProfileEditForm/ProfileEditForm";
import template from "./profileEdit.hbs";
import styles from "./profileEdit.less";

export class ProfileEditPage extends Block {
  protected initChildren() {
    this.children.profileHeader = new ProfileHeader();

    this.children.sidebar = new ProfileSidebar();

    this.children.profileEditForm = new ProfileEditForm();
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
