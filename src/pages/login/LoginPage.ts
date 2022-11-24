import Block from '/src/utils/Block';
import { Button, InputFiled, Link } from '/src/components'
import template from './loginPage.hbs';
import styles from './login.less'

export class LoginPage extends Block {
  protected initChildren() {
    this.children.loginField = new InputFiled({
      type: 'text',
      id: 'login-form__login',
      label: 'Логин',
      name: 'login',
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
        click: () => console.log('gotcha')
      }
    })

    this.children.registerLink = new Link({
      text: 'Нет аккаунта?',
      type: 'medium',
      url: '/registration'
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
