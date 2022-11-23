import Block from "/src/utils/Block";
import { Link, Button, InputFiled } from '../../components'
import template from './registration.hbs';
import styles from './registration.less'

export class RegistrationPage extends Block {
  protected initChildren() {
    this.children.emailField = new InputFiled({
      type: 'email',
      id: 'registration-form__email',
      label: 'Почта',
      name: 'email',
    })

    this.children.loginField = new InputFiled({
      type: 'text',
      id: 'login-form__login',
      label: 'Логин',
      name: 'login',
    })

    this.children.firstNameField = new InputFiled({
      type: 'text',
      id: 'registration-form__firstName',
      label: 'Имя',
      name: 'first_name',
    })

    this.children.secondNameField = new InputFiled({
      type: 'text',
      id: 'registration-form__secondName',
      label: 'Фамилия',
      name: 'second_name',
    })

    this.children.phoneField = new InputFiled({
      type: 'tel',
      id: 'registration-form__phone',
      label: 'Телефон',
      name: 'phone',
    })

    this.children.passwordField = new InputFiled({
      type: 'password',
      id: 'registration-form__password',
      label: 'Пароль',
      name: 'password',
    })

    this.children.repeatPasswordField = new InputFiled({
      type: 'password',
      id: 'registration-form__repeatPassword',
      label: 'Пароль (еще раз)',
      name: 'repeatPassword',
    })

    this.children.registerButton = new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: () => console.log('gotcha')
      }
    })

    this.children.loginLink = new Link({
      text: 'Войти',
      type: 'medium',
      url: '/registration'
    })
  }
  protected render() {
    return this.compile(template, { styles })
  }
}
