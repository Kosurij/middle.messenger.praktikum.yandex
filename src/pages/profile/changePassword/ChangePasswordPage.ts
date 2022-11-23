import Block from "/src/utils/Block";
import {ProfileHeader} from "/src/pages/profile/components/ProfileHeader/ProfileHeader";
import {ProfileSidebar} from "/src/pages/profile/components/ProfileSidebar/ProfileSidebar";
import {Button, InputFiled} from "/src/components";
import template from "./changePassword.hbs";
import styles from "./changePassword.less";

export class ChangePasswordPage extends Block {
  protected initChildren() {
    this.children.profileHeader = new ProfileHeader();

    this.children.sidebar = new ProfileSidebar();

    this.children.oldPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__oldPassword',
      label: 'Старый пароль',
      name: 'oldPassword',
    })

    this.children.newPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__newPassword',
      label: 'Новый пароль',
      name: 'newPassword',
    })

    this.children.repeatNewPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__repeatNewPassword',
      label: 'Повторите новый пароль',
      name: 'repeatNewPassword',
    })

    this.children.saveButton = new Button({
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: () => console.log('gotcha')
      }
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
