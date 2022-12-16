import Block from "/src/utils/Block";
import { ProfileSidebar } from "/src/pages/profile/components/ProfileSidebar/ProfileSidebar";
import { Button, InputFiled } from "/src/components";
import template from "./changePassword.hbs";
import styles from "./changePassword.less";
import { validateForm } from "/src/utils/validation/validateForm";
import { IPassword } from "/src/types";
import UserController from "/src/controllers/UserController";

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
  }

  onSubmit() {
    const form = document.querySelector('#changePassword-form') as HTMLFormElement;

    form.onsubmit = (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement)

      if (validateForm(data)) {
        const formData = Object.fromEntries(data.entries()) as unknown as IPassword;

        UserController.changePassword(formData)
      }
    }
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
