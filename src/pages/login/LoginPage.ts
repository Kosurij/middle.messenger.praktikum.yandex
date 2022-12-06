import Block from '/src/utils/Block';
import { Button, InputFiled, Link } from '/src/components';
import { RegistrationPage } from "/src/pages/registration/RegistrationPage";
import { ChatsPage } from "/src/pages/chats/ChatsPage";
import { renderDOM } from "/src/utils/renderDOM";
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
      url: '/registration',
      events: {
        click: (e) => {
          const registrationPage = new RegistrationPage();

          e.preventDefault();

          renderDOM(registrationPage);
        },
      },
    });

    this.children.chatsLink = new Link({
      text: 'К чатам',
      type: 'medium',
      url: '/chats',
      events: {
        click: (e) => {
          const chatsPage = new ChatsPage();

          e.preventDefault();

          renderDOM(chatsPage);
        },
      },
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
