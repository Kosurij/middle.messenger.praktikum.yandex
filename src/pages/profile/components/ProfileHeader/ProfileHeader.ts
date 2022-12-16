import Block from "/src/utils/Block";
import template from "./profileHeader.hbs";
import styles from "./profileHeader.less";
import { TState } from "/src/types";
import store from "/src/utils/Store";
import { userReducer } from "/src/reducers";
import ResourcesController from "/src/controllers/ResourcesController";
import { Avatar } from "./components/Avatar";
import { Button, Dialog, InputFiled } from "/src/components";
import { validateForm } from "/src/utils/validation/validateForm";
import UserController from "/src/controllers/UserController";

export class ProfileHeader extends Block {
  private userData: TState;

  protected initChildren() {
    const state = store.getState();

    this.userData = userReducer(state);

    this.changeAvatarState();

    this.children.changeAvatarDialog = new Dialog({
      title: 'Загрузите файл',
      content: new InputFiled({
        type: 'file',
        id: 'avatar',
        label: '',
        name: 'avatar',
        value: this.props?.avatar,
        accept: 'image/*',
        customClass: 'fileInput'
      }),
      submit: new Button({
        label: 'Сохранить',
        type: 'submit',
        events: {
          click: () => this.onChangeAvatarSubmit()
        }
      }),
      cancel:  new Button({
        label: 'Отменить',
        type: 'button',
        isGhost: true,
        customClass: 'dialog__actions-cancel',
        events: {
          click: () => this.closeDialog()
        }
      }),
    })

    this.children.avatar = new Avatar({
      events: {
        click: () => this.showDialog()
      }
    })
  }

  onChangeAvatarSubmit() {
    const form = document.querySelector('#dialog-form') as HTMLFormElement;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement)

      if (validateForm(data)) {
        await UserController.changeAvatar(data);

        this.closeDialog();

        this.changeAvatarState();
      }
    }
  }

  showDialog() {
    (this.children.changeAvatarDialog as Dialog).show();
  }

  closeDialog() {
    (this.children.changeAvatarDialog as Dialog).hide();
  }

  changeAvatarState() {
    const state = store.getState();

    const { avatar } = userReducer(state);

    ResourcesController.getResources(avatar);
  }

  protected render() {
    return this.compile(template, {
      first_name: this.userData.first_name,
      events: {
        click: () => this.showDialog
      },
      styles
    });
  }
}
