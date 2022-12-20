import Block from "/src/utils/Block";
import template from "./dropdown.hbs";
import styles from "./dropdown.less";
import addUserIcon from '/static/add_user.svg'
import deleteUserIcon from '/static/delete_user.svg'
import { Button, Dialog, IconButton, InputFiled } from "/src/components";

interface IDropdown {
  element: Block;
  items?: Block[];
}

class Dropdown extends Block {
  constructor(props: IDropdown) {
    super(props);
  }

  init() {
    this.children.addUserDialog = new Dialog({
      title: 'Добавить пользователя',
      contentFullWidth: true,
      submit: new Button({
        label: 'Добавить',
        type: 'submit',
        events: {
          click: () => console.log('yo')
        }
      }),
      content: new InputFiled({
        type: "text",
        id: "userDialog",
        label: "Логин",
        name: "login"
      }),
      cancel:  new Button({
        label: 'Отменить',
        type: 'button',
        isGhost: true,
        customClass: 'dialog__actions-cancel',
        events: {
          click: () => this.closeAddUserDialog()
        }
      }),
    })

    this.children.deleteUserDialog = new Dialog({
      title: 'Удалить пользователя',
      contentFullWidth: true,
      submit: new Button({
        label: 'Удалить',
        type: 'submit',
        events: {
          click: () => console.log('yo')
        }
      }),
      content: new InputFiled({
        type: "text",
        id: "userDialog",
        label: "Логин",
        name: "login"
      }),
      cancel:  new Button({
        label: 'Отменить',
        type: 'button',
        isGhost: true,
        customClass: 'dialog__actions-cancel',
        events: {
          click: () => this.closeDeleteUserDialog()
        }
      }),
    })

    this.children.addUserButton = new IconButton({
      text: 'Добавить пользователя',
      icon: addUserIcon,
      events: {
        click: () => this.showAddUserDialog()
      }
    })

    this.children.deleteUserButton = new IconButton({
      text: 'Удалить пользователя',
      icon: deleteUserIcon,
      events: {
        click: () => this.showDeleteUserDialog()
      }
    })
  }

  showAddUserDialog() {
    (this.children.addUserDialog as Dialog).show();
  }

  closeAddUserDialog() {
    (this.children.addUserDialog as Dialog).hide();
  }

  showDeleteUserDialog() {
    (this.children.deleteUserDialog as Dialog).show();
  }

  closeDeleteUserDialog() {
    (this.children.deleteUserDialog as Dialog).hide();
  }

  protected render() {
    return this.compile(template, { styles,
      element: this.props.element,
      items: this.props.items,
    });
  }
}

export default Dropdown;
