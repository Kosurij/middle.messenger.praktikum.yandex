import Block from "/src/utils/Block";
import { Button, InputFiled } from "/src/components";
import { validateForm } from "/src/utils/validation/validateForm";
import template from "./profileEditForm.hbs";
import styles from "./profileEditForm.less";
import UserController from "/src/controllers/UserController";
import { TProfile } from "/src/types";

export class ProfileEditForm extends Block {
  constructor(props: TProfile) {
    super(props);
  }

  protected initChildren() {
    this.children.emailEditField = new InputFiled({
      type: 'email',
      id: 'profileEdit__email',
      label: 'Почта',
      name: 'email',
      value: this.props?.email,
    });

    this.children.loginEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__login',
      label: 'Логин',
      name: 'login',
      value: this.props?.login,
    });

    this.children.displayNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__displayName',
      label: 'Имя в чате',
      name: 'display_name',
      value: this.props?.display_name,
    });

    this.children.firstNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__firstName',
      label: 'Имя',
      name: 'first_name',
      value: this.props?.first_name,
    });

    this.children.secondNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__secondName',
      label: 'Фамилия',
      name: 'second_name',
      value: this.props?.second_name,
    });

    this.children.phoneEditField = new InputFiled({
      type: 'tel',
      id: 'profileEdit__phone',
      label: 'Телефон',
      name: 'phone',
      value: this.props?.phone,
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
    const form = document.querySelector('#profileEdit-form') as HTMLFormElement;

    form.onsubmit = (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement)

      if (validateForm(data)) {
        const formData = Object.fromEntries(data.entries()) as unknown as TProfile;

        UserController.changeProfile(formData)
      }
    }
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
