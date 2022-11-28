import Block from "/src/utils/Block";
import { Link, Button, InputFiled } from '../../components';
import template from './registration.hbs';
import styles from './registration.less';
import { LoginPage } from "/src/pages/login/LoginPage";
import { renderDOM } from "/src/utils/renderDOM";
import { validateForm } from "/src/utils/validation/validateForm";

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

    this.children.repeatPasswordField = new InputFiled({
      type: 'password',
      id: 'registration-form__repeatPassword',
      label: 'Пароль (еще раз)',
      name: 'repeatPassword',
    });

    this.children.registerButton = new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: () => {
          const form = document.querySelector('#registration-form') as HTMLFormElement;

          form.onsubmit = (e) => validateForm(e);
        },
      },
    });

    this.children.loginLink = new Link({
      text: 'Войти',
      type: 'medium',
      url: '/',
      events: {
        click: (e) => {
          const loginPage = new LoginPage();

          e.preventDefault();

          renderDOM(loginPage);
        },
      },
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
