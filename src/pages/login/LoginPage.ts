import Block from '/src/utils/Block';
import { Button, InputFiled, Link } from '/src/components'
import template from './loginPage.hbs';
import styles from './login.less';
import { RegistrationPage } from "/src/pages/registration/RegistrationPage";
import  {ChatsPage } from "/src/pages/chats/ChatsPage";
import { renderDOM } from "/src/utils/renderDOM";

export class LoginPage extends Block {
  protected initChildren() {
    this.children.loginField = new InputFiled({
      type: 'text',
      id: 'login-form__login',
      label: 'Логин',
      name: 'login',
      required: 'required',
      events: {
        blur: () => {
          console.log('work')
        }
      }
    })

    this.children.passwordField = new InputFiled({
      type: 'password',
      id: 'login-form__password',
      label: 'Пароль',
      name: 'password',
    })

    this.children.loginButton = new Button({
      label: 'Авторизоваться',
      type: 'submit',
      events: {
        click: (e) => {
          if (e) {
            e.preventDefault();

            const loginField = document.querySelector('#login-form__login') as HTMLInputElement;
            const passwordField = document.querySelector('#login-form__password') as HTMLInputElement;

            const data: Record<string, string> = { login: loginField?.value, password: passwordField?.value }

            console.log(data)
          }
        }
      }
    })

    this.children.registerLink = new Link({
      text: 'Нет аккаунта?',
      type: 'medium',
      url: '/registration',
      events: {
        click: (e) => {
          const registrationPage = new RegistrationPage()

          e.preventDefault();

          renderDOM(registrationPage)
        }
      }
    })

    this.children.chatsLink = new Link({
      text: 'К чатам',
      type: 'medium',
      url: '/chats',
      events: {
        click: (e) => {
          const chatsPage = new ChatsPage()

          e.preventDefault();

          renderDOM(chatsPage)
        }
      }
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
