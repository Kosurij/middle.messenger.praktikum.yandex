import Block from '/src/utils/Block';
import { Link, Button, InputFiled } from '../../components';
import { validateForm } from '/src/utils/validation/validateForm';
import { ROUTES } from '/src/const/routes';
import { ISignUpData } from "/src/types/authTypes";
import AuthController from "/src/controllers/AuthController";
import template from './registration.hbs';
import styles from './registration.less';

export class RegistrationPage extends Block {
  protected initChildren() {
    this.children.emailField = new InputFiled({
      type: 'email',
      id: 'registration-form__email',
      label: 'Почта',
      name: 'email',
    });

    this.children.loginField = new InputFiled({
      type: 'text',
      id: 'login-form__login',
      label: 'Логин',
      name: 'login',
    });

    this.children.firstNameField = new InputFiled({
      type: 'text',
      id: 'registration-form__firstName',
      label: 'Имя',
      name: 'first_name',
    });

    this.children.secondNameField = new InputFiled({
      type: 'text',
      id: 'registration-form__secondName',
      label: 'Фамилия',
      name: 'second_name',
    });

    this.children.phoneField = new InputFiled({
      type: 'tel',
      id: 'registration-form__phone',
      label: 'Телефон',
      name: 'phone',
    });

    this.children.passwordField = new InputFiled({
      type: 'password',
      id: 'registration-form__password',
      label: 'Пароль',
      name: 'password',
    });

    this.children.registerButton = new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: () => this.onSubmit()
      },
    });

    this.children.loginLink = new Link({
      text: 'Войти',
      type: 'medium',
      to: ROUTES.INDEX,
    });
  }

  onSubmit() {
    const form = document.querySelector('#registration-form') as HTMLFormElement;

    form.onsubmit = (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement)

      if (validateForm(data)) {
        const formData = Object.fromEntries(data.entries()) as unknown as ISignUpData;

        AuthController.signUp(formData)
      }
    };
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
