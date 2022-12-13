import Block from '/src/utils/Block';
import { Button, InputFiled, Link } from '/src/components';
import { validateForm } from "/src/utils/validation/validateForm";
import template from './loginPage.hbs';
import styles from './login.less';

export class LoginPage extends Block {
  protected initChildren() {
    this.children.loginField = new InputFiled({
      type: 'text',
      id: 'login-form__login',
      label: 'Логин',
      name: 'login',
    });

    this.children.passwordField = new InputFiled({
      type: 'password',
      id: 'login-form__password',
      label: 'Пароль',
      name: 'password',
    });

    this.children.loginButton = new Button({
      label: 'Авторизоваться',
      type: 'submit',
      events: {
        click: () => {
          const form = document.querySelector('#login-form') as HTMLFormElement;

          form.onsubmit = (e) => validateForm(e);
        },
      },
    });

    this.children.registerLink = new Link({
      text: 'Нет аккаунта?',
      type: 'medium',
      to: '/registration',
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
