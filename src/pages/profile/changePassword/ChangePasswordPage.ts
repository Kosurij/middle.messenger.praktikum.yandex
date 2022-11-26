import Block from "/src/utils/Block";
import {ProfileHeader} from "/src/pages/profile/components/ProfileHeader/ProfileHeader";
import {ProfileSidebar} from "/src/pages/profile/components/ProfileSidebar/ProfileSidebar";
import {Button, InputFiled} from "/src/components";
import template from "./changePassword.hbs";
import styles from "./changePassword.less";
import {inputValidation} from "/src/utils/validation/validatator";
import {validateForm} from "/src/utils/validation/validateForm";

export class ChangePasswordPage extends Block {
  protected initChildren() {
    this.children.profileHeader = new ProfileHeader();

    this.children.sidebar = new ProfileSidebar();

    this.children.oldPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__oldPassword',
      label: 'Старый пароль',
      name: 'oldPassword',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      }
    })

    this.children.newPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__newPassword',
      label: 'Новый пароль',
      name: 'password',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      }
    })

    this.children.repeatNewPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__repeatNewPassword',
      label: 'Повторите новый пароль',
      name: 'repeatPassword',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      }
    })

    this.children.saveButton = new Button({
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: () => {
          const form = document.querySelector('#changePassword-form') as HTMLFormElement;

          form.onsubmit = (e) => validateForm(e);
        }
      }
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
