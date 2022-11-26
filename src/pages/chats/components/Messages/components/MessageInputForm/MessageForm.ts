import Block from "/src/utils/Block";
import { Button } from "/src/components";
import { validateForm } from "/src/utils/validation/validateForm";
import template from './messageForm.hbs';
import styles from './messageForm.less';
import { MessageInput } from "/src/pages/chats/components/Messages/components/MessageInputForm/MessageInput/MessageInput";
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
          console.log('work');
          inputValidation(e.target as HTMLInputElement, '.messageInput', 'messageInput-error');
        },
        focusout: (e) => {
          console.log('work');
          inputValidation(e.target as HTMLInputElement, '.messageInput', 'messageInput-error');
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
