import Block from "/src/utils/Block";
import { TextField } from "/src/components";
import template from "./profileDetailsData.hbs";
import styles from "./profileDetailsData.less";
import { IUser } from "/src/types/authTypes";

export class ProfileDetailsData extends Block {
  constructor(props: IUser) {
    super(props);
  }

  protected initChildren() {
    this.children.emailField = new TextField({
      label: 'Почта',
      value: this.props?.email,
    });

    this.children.loginField = new TextField({
      label: 'Логин',
      value: this.props?.login,
    });

    this.children.firstNameField = new TextField({
      label: 'Имя',
      value: this.props?.first_name,
    });

    this.children.secondNameField = new TextField({
      label: 'Фамилия',
      value: this.props?.second_name,
    });

    this.children.chatNameField = new TextField({
      label: 'Имя в чате',
      value: this.props?.login,
    });

    this.children.phoneField = new TextField({
      label: 'Телефон',
      value: this.props?.phone,
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
