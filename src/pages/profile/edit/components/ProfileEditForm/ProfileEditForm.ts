import Block from "/src/utils/Block";
import {Button, InputFiled} from "/src/components";
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
    })

    this.children.loginEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__login',
      label: 'Логин',
      name: 'login',
      value: 'ivanivanov',
    })

    this.children.firstNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__firstName',
      label: 'Имя',
      name: 'first_name',
      value: 'Иван',
    })

    this.children.secondNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__secondName',
      label: 'Фамилия',
      name: 'second_name',
      value: 'Иванов',
    })

    this.children.chatNameEditField = new InputFiled({
      type: 'text',
      id: 'profileEdit__chatName',
      label: 'Имя в чате',
      name: 'chatName',
      value: 'Иван',
    })

    this.children.phoneEditField = new InputFiled({
      type: 'tel',
      id: 'profileEdit__phone',
      label: 'Телефон',
      name: 'phone',
      value: '+7 (909) 967 30 30',
    })

    this.children.saveButton = new Button({
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: () => console.log('gotcha')
      }
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
