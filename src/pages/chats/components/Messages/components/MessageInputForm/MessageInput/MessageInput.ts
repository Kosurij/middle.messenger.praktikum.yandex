import Block from "/src/utils/Block";
import template from "./messageInput.hbs";
import styles from "./messageInput.less";

interface IMessageInput {
  events: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  }
}

export class MessageInput extends Block {
  constructor(props: IMessageInput) {
    super(props);
  }

  protected render() {
    return this.compile(template, {
      events: {
        focusin: this.props.focusin,
        focusout: this.props.focusout,
      },
      styles
    })
  }
}
