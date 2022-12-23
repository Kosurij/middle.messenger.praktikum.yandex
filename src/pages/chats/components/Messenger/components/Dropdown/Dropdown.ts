import Block from "/src/utils/Block";
import template from "./dropdown.hbs";
import styles from "./dropdown.less";
import addUserIcon from '/static/add_user.svg';
import deleteUserIcon from '/static/delete_user.svg';
import {
  Button, Dialog, IconButton, InputFiled,
} from "/src/components";
import { validateForm } from "/src/utils/validation/validateForm";
import ChatsController from "/src/controllers/ChatsController";
import UserController from "/src/controllers/UserController";
import { IUser } from "/src/types";
import store from "/src/utils/Store";
import { searchedUserReducer, selectedChatReducer } from "/src/reducers";

interface IDropdown {
  element: Block;
}

class Dropdown extends Block {
  constructor(props: IDropdown) {
    super(props);
  }

  init() {
    this.children.addUserDialog = new Dialog({
      title: 'Добавить пользователя',
      contentFullWidth: true,
      id: 'addUserDialog-form',
      submit: new Button({
        label: 'Добавить',
        type: 'submit',
        events: {
          click: () => this.addUser(),
        },
      }),
      content: new InputFiled({
        type: "text",
        id: "userDialog",
        label: "Логин",
        name: "login",
      }),
      cancel: new Button({
        label: 'Отменить',
        type: 'button',
        isGhost: true,
        customClass: 'dialog__actions-cancel',
        events: {
          click: () => this.closeAddUserDialog(),
        },
      }),
    });

    this.children.deleteUserDialog = new Dialog({
      title: 'Удалить пользователя',
      contentFullWidth: true,
      id: 'deleteUserDialog-form',
      submit: new Button({
        label: 'Удалить',
        type: 'submit',
        events: {
          click: () => this.deleteUser(),
        },
      }),
      content: new InputFiled({
        type: "text",
        id: "userDialog",
        label: "Логин",
        name: "login",
      }),
      cancel: new Button({
        label: 'Отменить',
        type: 'button',
        isGhost: true,
        customClass: 'dialog__actions-cancel',
        events: {
          click: () => this.closeDeleteUserDialog(),
        },
      }),
    });

    this.children.addUserButton = new IconButton({
      text: 'Добавить пользователя',
      icon: addUserIcon,
      events: {
        click: () => this.showAddUserDialog(),
      },
    });

    this.children.deleteUserButton = new IconButton({
      text: 'Удалить пользователя',
      icon: deleteUserIcon,
      events: {
        click: () => this.showDeleteUserDialog(),
      },
    });
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

  addUser() {
    const form = document.querySelector('#addUserDialog-form') as HTMLFormElement;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);

      if (validateForm(data)) {
        const login = Object.fromEntries(data.entries()) as unknown as Pick<IUser, 'login'>;

        const state = store.getState();

        await UserController.searchUser(login);

        const searchedUser = searchedUserReducer(state)[0];

        const chatId = selectedChatReducer(state);

        await ChatsController.addUserToChat(chatId, searchedUser);

        this.closeAddUserDialog();
      }
    };
  }

  deleteUser() {
    const form = document.querySelector('#deleteUserDialog-form') as HTMLFormElement;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);

      if (validateForm(data)) {
        const login = Object.fromEntries(data.entries()) as unknown as Pick<IUser, 'login'>;

        const state = store.getState();

        await UserController.searchUser(login);

        const searchedUser = searchedUserReducer(state)[0];

        const chatId = selectedChatReducer(state);

        await ChatsController.deleteUserFromChat(chatId, searchedUser);

        this.closeDeleteUserDialog();
      }
    };
  }

  protected render() {
    return this.compile(template, { styles, element: this.props.element });
  }
}

export default Dropdown;
