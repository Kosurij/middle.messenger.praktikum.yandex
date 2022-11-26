import Block from "/src/utils/Block";
import { Button, InputFiled } from "/src/components";
import { validateForm } from "/src/utils/validation/validateForm";
import { inputValidation } from "/src/utils/validation/validatator";
import template from "./profileEditForm.hbs";
import styles from "./profileEditForm.less";

export class ProfileEditForm extends Block {
  protected initChildren() {
    this.children.emailEditField = new InputFiled({
      type: 'email',
      id: 'profileEdit__email',
      label: 'Почта',
      name: 'email',
      value: 'pochta@yandex.ru',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      },
    });

    this.children.loginEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__login',
      label: 'Логин',
      name: 'login',
      value: 'ivanivanov',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      },
    });

    this.children.firstNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__firstName',
      label: 'Имя',
      name: 'first_name',
      value: 'Иван',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      },
    });

    this.children.secondNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__secondName',
      label: 'Фамилия',
      name: 'second_name',
      value: 'Иванов',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      },
    });

    this.children.phoneEditField = new InputFiled({
      type: 'tel',
      id: 'profileEdit__phone',
      label: 'Телефон',
      name: 'phone',
      value: '+79099673030',
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement);
        },
      },
    });

    this.children.saveButton = new Button({
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: () => {
          const form = document.querySelector('#profileEdit-form') as HTMLFormElement;

          form.onsubmit = (e) => validateForm(e);
        },
      },
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
