import Block from "../../utils/Block";
import template from './loginPage.hbs';
import { Button } from "../../components/Button/Button";
import InputFiled from "../../components/InputField/InputField";
import Link from "../../components/Link/Link";
import styles from './login.less'

export class LoginPage extends Block {
  // constructor(props: { buttonText: string }) {
  //   super(props);
  // }

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
      url: '/'
    })
  }
  // protected componentDidUpdate(oldProps: any, newProps: any): boolean  {
  //   if (oldProps.buttonText !== newProps.buttonText) {
  //     this.children.button.setProps({
  //       label: newProps.buttonText,
  //     })
  //   }
  //
  //   return super.componentDidUpdate(oldProps, newProps);
  // }

  protected render() {
    return this.compile(template, { styles })
  }
}
