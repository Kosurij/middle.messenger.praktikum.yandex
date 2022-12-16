import Block from '/src/utils/Block';
import { ProfileSidebar } from '/src/pages/profile/components/ProfileSidebar/ProfileSidebar';
import { ProfileEditForm } from '/src/pages/profile/edit/components/ProfileEditForm/ProfileEditForm';
import template from './profileEdit.hbs';
import styles from './profileEdit.less';
import { TState } from '/src/types';
import store from '/src/utils/Store';
import { userReducer } from '/src/reducers';
import { ProfileHeader } from "/src/pages/profile/components/ProfileHeader/ProfileHeader";

export class ProfileEditPage extends Block {
  private userData: TState;

  protected initChildren() {
    const state = store.getState();

    this.userData = userReducer(state);

    this.children.sidebar = new ProfileSidebar();

    this.children.profileEditForm = new ProfileEditForm(this.userData);

    this.children.profileHeader = new ProfileHeader();
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
