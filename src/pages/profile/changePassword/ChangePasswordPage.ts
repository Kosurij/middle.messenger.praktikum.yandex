import Block from "/src/utils/Block";
import { ProfileSidebar } from "/src/pages/profile/components/ProfileSidebar/ProfileSidebar";
import { Button, InputFiled } from "/src/components";
import template from "./changePassword.hbs";
import styles from "./changePassword.less";
import { validateForm } from "/src/utils/validation/validateForm";
import { IPassword } from "/src/types";
import UserController from "/src/controllers/UserController";
import { ProfileHeader } from "/src/pages/profile/components/ProfileHeader/ProfileHeader";

export class ChangePasswordPage extends Block {
  protected initChildren() {
    this.children.sidebar = new ProfileSidebar();

    this.children.oldPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__oldPassword',
      label: 'Старый пароль',
      name: 'oldPassword',
    });

    this.children.newPasswordField = new InputFiled({
      type: 'password',
      id: 'changePassword__newPassword',
      label: 'Новый пароль',
      name: 'newPassword',
    });

    this.children.saveButton = new Button({
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: () => this.onSubmit()
      },
    });

    this.children.profileHeader = new ProfileHeader();
  }

  onSubmit() {
    const form = document.querySelector('#changePassword-form') as HTMLFormElement;

    form.onsubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement)

      if (validateForm(formData)) {
        const data = Object.fromEntries(formData.entries()) as unknown as IPassword;

        UserController.changePassword(data)
      }
    }
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
