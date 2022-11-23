import Block from "/src/utils/Block";
import { TextField } from "/src/components";
import template from "./profileDetailsData.hbs";
import styles from "./profileDetailsData.less";

export class ProfileDetailsData extends Block {
  protected initChildren() {

    this.children.emailField = new TextField({
      label: 'Почта',
      value: 'pochta@yandex.ru',
    })

    this.children.loginField = new TextField({
      label: 'Логин',
      value: 'ivanivanov',
    })

    this.children.firstNameField = new TextField({
      label: 'Имя',
      value: 'Иван',
    })

    this.children.secondNameField = new TextField({
      label: 'Фамилия',
      value: 'Иванов',
    })

    this.children.chatNameField = new TextField({
      label: 'Имя в чате',
      value: 'Иван',
    })

    this.children.phoneField = new TextField({
      label: 'Телефон',
      value: '+7 (909) 967 30 30',
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
