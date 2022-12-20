import Block from '/src/utils/Block';
import { Button, Dialog, InputFiled, Link } from '/src/components';
import { ROUTES } from '/src/const/routes';
import template from './chatsHeader.hbs';
import styles from './chatsHeader.less';
import { validateForm } from "/src/utils/validation/validateForm";
import ChatsController from "/src/controllers/ChatsController";

export class ChatsHeader extends Block {
  protected initChildren() {
    this.children.profileLink = new Link({
      text: 'Профиль',
      to: ROUTES.PROFILE,
      customClass: 'chatsHeader__actionMenu__link',
    });

    this.children.createChatButton = new Button({
      label: 'Создать чат',
      type: 'button',
      isGhost: true,
      customClass: 'chatsHeader__actionMenu__createChatButton',
      events: {
        click: () => this.showDialog()
      }
    })

    this.children.chatDialog = new Dialog({
      title: 'Новый чат',
      contentFullWidth: true,
      submit: new Button({
        label: 'Сохранить',
        type: 'submit',
        events: {
          click: () => this.createNewChat()
        }
      }),
      content: new InputFiled({
        type: "text",
        id: "chatDialog-newChat",
        label: "Название",
        name: "newChat"
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
  }

  showDialog() {
    (this.children.chatDialog as Dialog).show();
  }

  closeDialog() {
    (this.children.chatDialog as Dialog).hide();
  }

  createNewChat() {
    const form = document.querySelector('#dialog-form') as HTMLFormElement;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement)

      if (validateForm(data)) {
        const { newChat: title } = Object.fromEntries(data.entries());

        await ChatsController.create(title as string);

        this.closeDialog();
      }
    }
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
