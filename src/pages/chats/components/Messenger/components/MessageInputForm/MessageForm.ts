import Block from "/src/utils/Block";
import { Button } from "/src/components";
import { validateForm } from "/src/utils/validation/validateForm";
import template from './messageForm.hbs';
import styles from './messageForm.less';
import { MessageInput } from "/src/pages/chats/components/Messenger/components/MessageInputForm/MessageInput/MessageInput";
import { inputValidation } from "/src/utils/validation/validatator";

export class MessageForm extends Block {
  protected initChildren() {
    this.children.sendButton = new Button({
      label: '',
      type: 'submit',
      events: {
        click: () => {
          const form = document.querySelector('#message-form') as HTMLFormElement;

          form.onsubmit = (e) => validateForm(e, '.messageInput', 'messageInput-error');
        },
      },
      customClass: 'message-form__sendMessage',
    });

    this.children.messageInput = new MessageInput({
      events: {
        focusin: (e) => {
          inputValidation(e.target as HTMLInputElement, 'messageInput-error');
        },
        focusout: (e) => {
          inputValidation(e.target as HTMLInputElement, 'messageInput-error');
        },
      },
    });
  }

  protected render() {
    return this.compile(template, {
      styles,
    });
  }
}