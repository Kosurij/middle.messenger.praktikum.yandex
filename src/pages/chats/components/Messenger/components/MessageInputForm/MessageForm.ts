import Block from "/src/utils/Block";
import { Button } from "/src/components";
import template from './messageForm.hbs';
import styles from './messageForm.less';
import { MessageInput } from "/src/pages/chats/components/Messenger/components/MessageInputForm/MessageInput/MessageInput";
import MessagesController from "/src/controllers/MessagesController";
import store from "/src/utils/Store";

export class MessageForm extends Block {
  constructor() {
    super();

    this.getContent()!.onsubmit = (e) => {
      e.preventDefault();
    };
  }

  protected init() {
    this.children.sendButton = new Button({
      label: '',
      type: 'submit',
      events: {
        click: () => this.sendMessage(),
      },
      customClass: 'message-form__sendMessage',
    });

    this.children.messageInput = new MessageInput();
  }

  sendMessage() {
    const form = document.querySelector('#message-form') as HTMLFormElement;

    form.onsubmit = (e) => {
      e.preventDefault();

      const { message } = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());

      const input = this.element?.children[1].children[0] as HTMLInputElement;

      if (message) {
        const { selectedChat } = store.getState();

        MessagesController.sendMessage(selectedChat!, message as string);

        input.value = '';
      }
    };
  }

  protected render() {
    return this.compile(template, {
      styles,
    });
  }
}
